FROM node:18 as build
WORKDIR /building
COPY .yarn .yarn
COPY .yarnrc.yml .yarnrc.yml
COPY package.json package.json
COPY app/package.json app/package.json
COPY web/package.json web/package.json
COPY yarn.lock yarn.lock
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn cache clean