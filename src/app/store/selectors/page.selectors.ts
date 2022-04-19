import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PageState} from "../reducers/page.reducers";

export const selectPageFeature = createFeatureSelector<PageState>('page');

export const selectCurrentPage = createSelector(
  selectPageFeature,
  state => state.currentPage
)
