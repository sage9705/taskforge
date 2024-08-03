import { getTodos, saveTodos } from './todoStorage';
import { findUserByEmail, verifyUser, createUser } from './userStorage';
import { User } from '../store/slices/authSlice';

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