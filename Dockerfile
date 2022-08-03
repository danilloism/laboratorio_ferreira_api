###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:18-alpine as development

RUN apk add --no-cache curl \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node

# Create app directory
WORKDIR /usr/app

COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.build.json ./
COPY prisma ./prisma

RUN pnpm install
COPY . .

###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine as build

RUN apk add --no-cache curl \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node

WORKDIR /usr/app
COPY --from=development /usr/app/node_modules ./node_modules
COPY --from=development /usr/app/package.json ./package.json
COPY --from=development /usr/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=development /usr/app/prisma ./prisma
COPY tsconfig.json tsconfig.build.json ./
RUN pnpm build
RUN pnpm prune --prod

###################
# PRODUCTION
###################
FROM node:18-alpine As production

ENV NODE_ENV production

# Copy the bundled code from the build stage to the production image
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/prisma ./prisma

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
