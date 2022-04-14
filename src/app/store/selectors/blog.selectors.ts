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

export const selectPrincipalActiveBlogId = createSelector(
  selectBlogFeature,
  state => state.principalActiveBlog?.id
)

export const selectPrincipalActiveBlog = createSelector(
  selectBlogFeature,
  state => state.principalActiveBlog
)

export const selectSearchedBlogs = createSelector(
  selectBlogFeature,
  state => state.search.blogs
)

export const selectIsBlogCreateLoading = createSelector(
  selectBlogFeature,
  state => state.loading.isCreateLoading
)

export const selectIsBlogUpdateLoading = createSelector(
  selectBlogFeature,
  state => state.loading.isUpdateLoading
)

export const selectIsBlogDeleteLoading = createSelector(
  selectBlogFeature,
  state => state.loading.isDeleteLoading
)

export const selectIsBlogGetLoading = createSelector(
  selectBlogFeature,
  state => state.loading.isGetLoading
)

export const selectPrincipalManagedBlogIds = createSelector(
  selectBlogFeature,
  state => state.principalManagedBlogIds
)

export const selectIsPrincipalBlogOwner = createSelector(
  selectPrincipalActiveBlogId,
  selectSelectedBlogId,
  (authBlogId, selectedBlogId) => authBlogId === selectedBlogId
)

export const selectSelectedBlogCategories = createSelector(
  selectSelectedBlog,
  blog => blog.categories
)

export const selectActiveBlogCategories = createSelector(
  selectPrincipalActiveBlog,
  blog => blog.categories
)

export const selectActiveSubscriptions = createSelector(
  selectPrincipalActiveBlog,
  blog => blog.subscriptions
)

export const selectIsSubscriber = (blogId: BlogId) => createSelector(
  selectActiveSubscriptions,
  (subscriptions) => subscriptions.some(s => s.id.subscription.id === blogId.id && s.id.subscription.username && blogId.username)
)

export const selectBlogError = createSelector(
  selectBlogFeature,
  state => state.error.responseError
)
