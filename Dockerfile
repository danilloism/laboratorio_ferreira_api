###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:18-alpine as development

RUN apk add --no-cache curl \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node

# Create app directory
WORKDIR /usr/app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN pnpm install --frozen-lockfile
COPY . .

###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine as build

ENV NODE_ENV production
COPY --from=development /usr/app/node_modules ./node_modules
COPY --from=development /usr/app/prisma ./prisma
COPY package.json ./
COPY . .
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

###################
# PRODUCTION
###################
FROM node:18-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/app/prisma ./prisma

# Apply migrations to db
RUN npx prisma migrate deploy

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
