import { findUserByEmail, verifyUser, createUser } from './userStorage';
import { getTodos, saveTodos } from './todoStorage';

export const api = {
  todos: {
    get: getTodos,
    save: saveTodos,
  },
  users: {
    findByEmail: findUserByEmail,
    verify: verifyUser,
    create: createUser,
  },
};

export type Api = typeof api;