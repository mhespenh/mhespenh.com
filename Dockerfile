FROM node:18-bullseye-slim as base

FROM base as build
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn install
ADD . .
RUN yarn build

FROM base
ENV PORT="8080"
ENV NODE_ENV="production"
WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json

CMD ["yarn", "run",  "start"]
