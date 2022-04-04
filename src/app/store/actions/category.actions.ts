import {createAction, props} from "@ngrx/store";
import {Category} from "../../models/Category";

export enum CategoryActionTypes {

  CREATE_CATEGORY = "[category] create category",
  CREATE_CATEGORY_SUCCESS = "[category] create category success",
  CREATE_CATEGORY_FAILURE = "[category] create category failure",

  DELETE_CATEGORY = "[category] delete category",
  DELETE_CATEGORY_SUCCESS = "[category] delete category success",
  DELETE_CATEGORY_FAILURE = "[category] delete category failure",

  UPDATE_CATEGORY = "[category] update category",
  UPDATE_CATEGORY_SUCCESS = "[category] update category success",
  UPDATE_CATEGORY_FAILURE = "[category] update category failure",

  SET_SELECTED_CATEGORY = "[category] set selected category",
  RESET_SELECTED_CATEGORY = "[category] reset selected category"
}

export const createCategory = createAction(CategoryActionTypes.CREATE_CATEGORY, props<{name: string}>())
export const createCategorySuccess = createAction(CategoryActionTypes.CREATE_CATEGORY_SUCCESS, props<{category: Category}>())
export const createCategoryFailure = createAction(CategoryActionTypes.CREATE_CATEGORY_FAILURE, props<{error: any}>())

export const updateCategory = createAction(CategoryActionTypes.UPDATE_CATEGORY, props<{name: string}>())
export const updateCategorySuccess = createAction(CategoryActionTypes.UPDATE_CATEGORY_SUCCESS, props<{category: Category}>())
export const updateCategoryFailure = createAction(CategoryActionTypes.UPDATE_CATEGORY_FAILURE, props<{error: any}>())

export const deleteCategory = createAction(CategoryActionTypes.DELETE_CATEGORY, props<{categoryId: string}>())
export const deleteCategorySuccess = createAction(CategoryActionTypes.DELETE_CATEGORY_SUCCESS, props<{categoryId: Category}>())
export const deleteCategoryFailure = createAction(CategoryActionTypes.DELETE_CATEGORY_FAILURE, props<{error: any}>())

export const setSelectedCategory = createAction(CategoryActionTypes.SET_SELECTED_CATEGORY, props<{category: Category}>())
export const resetSelectedCategory = createAction(CategoryActionTypes.RESET_SELECTED_CATEGORY)
