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

WORKDIR /usr/app

COPY --from=development /usr/app/package.json ./package.json
COPY --from=development /usr/app/prisma/ ./prisma/

RUN npm i
COPY . .

ENV NODE_ENV production
RUN npm run build
RUN npm ci --omit=dev
#RUN npm ci --omit=dev
#RUN npm cache clean --force

###################
# PRODUCTION
###################
FROM node:18-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/prisma ./prisma

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
