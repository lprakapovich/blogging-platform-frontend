import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CategoryState} from "../reducers/category.reducers";

export const selectCategoryFeature = createFeatureSelector<CategoryState>('category')

export const selectIsCategoryLoading = createSelector(
  selectCategoryFeature,
  state => state.isLoading
)

export const selectCategoryError = createSelector(
  selectCategoryFeature,
  state => state.categoryError
)
