import {createFeatureSelector, createSelector } from "@ngrx/store";
import {BlogState} from "../reducers/blog.reducers";
import {BlogId} from "../../models/Blog";

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
  state => state.searchedBlogs
)

export const selectIsBlogLoading = createSelector(
  selectBlogFeature,
  state => state.isLoading
)

export const selectAuthenticatedUserBlogsIds = createSelector(
  selectBlogFeature,
  state => state.authenticatedUserBlogsIds
)

export const selectIsBlogOwner = createSelector(
  selectAuthenticatedUserBlogId,
  selectSelectedBlogId,
  (authBlogId, selectedBlogId) => authBlogId === selectedBlogId
)

export const selectSelectedBlogCategories = createSelector(
  selectSelectedBlog,
  blog => blog.categories
)

export const selectAuthenticatedUserBlogCategories = createSelector(
  selectAuthenticatedUserBlog,
  blog => blog.categories
)

export const selectAuthenticatedUserBlogSubscriptions = createSelector(
  selectAuthenticatedUserBlog,
  blog => blog.subscriptions
)

export const selectIsSubscriber = (blogId: BlogId) => createSelector(
  selectAuthenticatedUserBlogSubscriptions,
  (subscriptions) => subscriptions.some(s => s.id.subscription.id === blogId.id && s.id.subscription.username && blogId.username)
)
