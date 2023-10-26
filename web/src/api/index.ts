import { MessagesApiFactory, UsersApiFactory } from "./generated";

const basePath = "/api";

export const userApi = UsersApiFactory(undefined, basePath, undefined);

export const messagesApi = MessagesApiFactory(undefined, basePath, undefined);
