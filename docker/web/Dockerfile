FROM node:18.17.1-slim
WORKDIR /workspace
COPY ../web /web
COPY ../tsconfig.json .
WORKDIR /workspace/web
RUN yarn install --frozen-lockfile
CMD ["yarn", "start"]