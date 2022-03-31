import {createFeatureSelector, createSelector } from "@ngrx/store";
import {BlogState} from "../reducers/blog.reducers";

export const selectBlogFeature = createFeatureSelector<BlogState>('blog')

export const selectSelectedBlogId = createSelector(
  selectBlogFeature,
  state => state.selectedBlogId
)

export const selectAuthenticatedUserBlogId = createSelector(
  selectBlogFeature,
  state => state.authenticatedUserBlogId
)

export const selectBlogsBySearchCriteria = createSelector(
  selectBlogFeature,
  state => state.blogsBySearchCriteria
)

export const selectIsBlogLoading = createSelector(
  selectBlogFeature,
  state => state.isLoading
)

export const selectUserBlogIds = createSelector(
  selectBlogFeature,
  state => state.userBlogIds
)
