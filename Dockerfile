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

RUN pnpm install --frozen-lockfile
RUN pnpm build
COPY . .

###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine as build

RUN apk add --no-cache curl \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node

WORKDIR /usr/app

COPY --from=development /usr/app/package-lock.yaml ./package-lock.yaml

RUN pnpm fetch --prod

ADD . ./
RUN pnpm install -r --offline --prod

###################
# PRODUCTION
###################
FROM node:18-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=development /usr/app/dist ./dist
COPY --from=development /usr/app/prisma ./prisma

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
