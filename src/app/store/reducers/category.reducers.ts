import {Category} from "../../models/Category";
import {createReducer, on} from "@ngrx/store";
import * as CategoryActions from "../actions/category.actions";
import * as AuthActions from "../actions/auth.actions";

export interface CategoryState {
  blogCategories: Category[],
  selectedCategory: Category,
  isLoading: boolean,
  categoryError: any
}

export const initialState: CategoryState = {
  blogCategories: [],
  selectedCategory: {} as Category,
  isLoading: false,
  categoryError: null
}

export const categoryReducer = createReducer(
  initialState,

  on(AuthActions.logout, () => ({
    ...initialState,
  })),

  on(CategoryActions.createCategory, (state) => ({
    ...state,
    isLoading: true,
    categoryError: null
  })),

  on(CategoryActions.createCategorySuccess, (state, action) => ({
    ...state,
    isLoading: false,
    blogCategories: [
      ...state.blogCategories,
      action.category
    ],
    categoryError: null
  })),

  on(CategoryActions.createCategoryFailure, (state, action) => ({
    ...state,
    isLoading: false,
    categoryError: action.error
  })),

  on(CategoryActions.resetCategoryError, (state) => ({
    ...state,
    categoryError: null
  })),

  on(CategoryActions.deleteCategory, (state) => ({
    ...state,
    isLoading: true
  })),

  on(CategoryActions.deleteCategorySuccess, (state, action) => ({
    ...state,
    isLoading: false,
    blogCategories: state.blogCategories.filter(category => category.id !== action.categoryId)
  })),

  on(CategoryActions.deleteCategoryFailure, (state, action) => ({
    ...state,
    isLoading: false,
    categoryError: action.error
  })),

)
