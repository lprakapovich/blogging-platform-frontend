import {createAction, props} from "@ngrx/store";
import {Category} from "../../models/Category";

export enum CategoryActionTypes {

  CREATE_CATEGORY = "[category] create category",
  CREATE_CATEGORY_SUCCESS = "[category] create category success",
  CREATE_CATEGORY_FAILURE = "[category] create category failure",

  DELETE_CATEGORY = "[category] delete category",
  DELETE_CATEGORY_SUCCESS = "[category] delete category success",
  DELETE_CATEGORY_FAILURE = "[category] delete category failure",

  SET_SELECTED_CATEGORY = "[category] set selected category",
  RESET_SELECTED_CATEGORY = "[category] reset selected category",

  RESET_CATEGORY_ERROR = "[category] reset category error"
}

export const createCategory = createAction(CategoryActionTypes.CREATE_CATEGORY, props<{name: string}>())
export const createCategorySuccess = createAction(CategoryActionTypes.CREATE_CATEGORY_SUCCESS, props<{category: Category}>())
export const createCategoryFailure = createAction(CategoryActionTypes.CREATE_CATEGORY_FAILURE, props<{error: any}>())

export const deleteCategory = createAction(CategoryActionTypes.DELETE_CATEGORY, props<{id: number}>())
export const deleteCategorySuccess = createAction(CategoryActionTypes.DELETE_CATEGORY_SUCCESS, props<{categoryId: number}>())
export const deleteCategoryFailure = createAction(CategoryActionTypes.DELETE_CATEGORY_FAILURE, props<{error: any}>())

export const setSelectedCategory = createAction(CategoryActionTypes.SET_SELECTED_CATEGORY, props<{category: Category}>())
export const resetSelectedCategory = createAction(CategoryActionTypes.RESET_SELECTED_CATEGORY)

export const resetCategoryError = createAction(CategoryActionTypes.RESET_CATEGORY_ERROR)
