import { users } from "./users";

export * from "./users";

export const schema = {
  users,
};

export type Schema = typeof schema;
