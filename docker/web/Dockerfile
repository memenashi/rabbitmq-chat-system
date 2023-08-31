FROM node:18
COPY ../web /app
WORKDIR /app
RUN yarn install --frozen-lockfile
CMD ["yarn", "start"]