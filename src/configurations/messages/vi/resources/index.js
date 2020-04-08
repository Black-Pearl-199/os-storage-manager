import { gender } from "./gender";
import { resource } from './resource';
import { title } from './title';
import { password } from './password';
import { storage } from './storage';
import { STORAGE_TAG } from '../../../resources';

export const resources = {
  gender,
  resource,
  title,
  password,
  [STORAGE_TAG]: storage
};
