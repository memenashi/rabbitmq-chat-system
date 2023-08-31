FROM node:18.17.1-slim
COPY ../web /workspace/web
COPY ../tsconfig.json /workspace/tsconfig.json
WORKDIR /workspace/web
RUN yarn install --frozen-lockfile
CMD ["yarn", "start"]