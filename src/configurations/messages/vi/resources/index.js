import { gender } from "./gender";
import { resource } from './resource';
import { title } from './title';
import { password } from './password';
import { storage } from './storage';
import { statistic_distribute } from './statistic_distribute';
import { input_output_material } from './input_output_material';
import { STORAGE_TAG, STATISTIC_DISTRIBUTE, INPUT_OUTPUT_ORDER } from '../../../resources';

export const resources = {
  gender,
  resource,
  title,
  password,
  [STORAGE_TAG]: storage,
  [STATISTIC_DISTRIBUTE]: statistic_distribute,
  [INPUT_OUTPUT_ORDER]: input_output_material
};
