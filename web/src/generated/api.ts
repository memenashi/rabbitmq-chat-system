import { UsersApiFactory } from "./api/api";

const basePath = "/api";

export const userApi = UsersApiFactory(undefined, basePath, undefined);
