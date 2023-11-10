FROM node:18-bullseye-slim as base

FROM base as build
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn install
ADD . .
RUN yarn build

FROM base
ARG CONTENTFUL_GRAPHQL_ENDPOINT
ARG CONTENTFUL_API_TOKEN
ENV CONTENTFUL_GRAPHQL_ENDPOINT=$CONTENTFUL_GRAPHQL_ENDPOINT
ENV CONTENTFUL_API_TOKEN=$CONTENTFUL_API_TOKEN
ENV PORT="8080"
ENV NODE_ENV="production"
WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json

CMD ["yarn", "run",  "start"]
