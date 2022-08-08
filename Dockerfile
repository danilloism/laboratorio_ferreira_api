###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:lts-alpine as development
# Create app directory
WORKDIR /usr/app

COPY package.json yarn.lock tsconfig.json tsconfig.build.json ./
COPY prisma ./prisma

RUN yarn install --frozen-lockfile
COPY . .

###################
# BUILD FOR PRODUCTION
###################
FROM node:lts-alpine as build

WORKDIR /usr/app
COPY --from=development /usr/app/node_modules ./node_modules
#COPY --from=development /usr/app/prisma ./prisma
#COPY --from=development /usr/app/dist ./dist
COPY . .
ENV NODE_ENV production
RUN yarn run build
RUN yarn install && yarn cache clean
COPY --from=development /usr/app/prisma ./prisma

###################
# PRODUCTION
###################
FROM node:lts-alpine As production

ENV NODE_ENV production

# Copy the bundled code from the build stage to the production image
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/prisma ./prisma

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
