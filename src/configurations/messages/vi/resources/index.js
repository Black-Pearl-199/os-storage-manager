import { gender } from "./gender";
import { resource } from "./resource";
import { title } from "./title";
import { password } from "./password";
import { storage_tag } from "./storage_tag";
import { storage } from "./storage";
import { statistic_distribute } from "./statistic_distribute";
import { input_output_material } from "./input_output_material";
import { material_distribute } from './material_distribute';
import { account } from './account';
import {
    STORAGE_TAG,
    STATISTIC_DISTRIBUTE,
    INPUT_OUTPUT_ORDER,
    STORAGE,
    MATERIAL_DISTRIBUTE,
    ACCOUNT,
} from "../../../resources";

export const resources = {
    gender,
    resource,
    title,
    password,
    [STORAGE_TAG]: storage_tag,
    [STORAGE]: storage,
    [STATISTIC_DISTRIBUTE]: statistic_distribute,
    [INPUT_OUTPUT_ORDER]: input_output_material,
    [MATERIAL_DISTRIBUTE]: material_distribute,
    [ACCOUNT]: account
};
