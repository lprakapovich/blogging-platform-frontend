import {Category} from "../../models/Category";
import {createReducer, on} from "@ngrx/store";
import * as CategoryActions from "../actions/category.actions";

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
  }))
)
