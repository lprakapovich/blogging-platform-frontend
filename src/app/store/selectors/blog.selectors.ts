import {createFeatureSelector, createSelector } from "@ngrx/store";
import {BlogState} from "../reducers/blog.reducers";

export const selectBlogFeature = createFeatureSelector<BlogState>('blog')

export const selectSelectedBlog = createSelector(
  selectBlogFeature,
  state => state.selectedBlog
)

export const selectSelectedBlogId = createSelector(
  selectBlogFeature,
  state => state.selectedBlog?.id
)

export const selectAuthenticatedUserBlogId = createSelector(
  selectBlogFeature,
  state => state.authenticatedUserBlog?.id
)

export const selectAuthenticatedUserBlog = createSelector(
  selectBlogFeature,
  state => state.authenticatedUserBlog
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
  state => state.userBlogs.map(b => b?.id)
)

export const selectIsBlogOwner = createSelector(
  selectAuthenticatedUserBlogId,
  selectSelectedBlogId,
  (authBlogId, selectedBlogId) => authBlogId === selectedBlogId
)

export const selectSelectedBlogCategories = createSelector(
  selectSelectedBlog,
  (blog) => blog.categories?.map(c => c.name)
)
