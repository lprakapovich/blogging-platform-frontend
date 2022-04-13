import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostState} from "../reducers/post.reducers";
import {selectPrincipalActiveBlogId} from "./blog.selectors";

export const selectPostFeature = createFeatureSelector<PostState>('post')

export const selectPostsBySearchCriteria = createSelector(
  selectPostFeature,
  state => state.postsBySearchCriteria
)

export const selectIsPostLoading = createSelector(
  selectPostFeature,
  state => state.isLoading
)

export const selectPostsFromSubscriptions = createSelector(
  selectPostFeature,
  state => state.postsFromSubscriptions
)

export const selectSelectedPost = createSelector(
  selectPostFeature,
  state => state.selectedPost
)

export const selectIsAuthenticatedUsersPost = createSelector(
  selectPrincipalActiveBlogId,
  selectSelectedPost,
  (authenticatedBlogId, selectedPost) => !selectedPost ? false :
    selectedPost.blog.id.id === authenticatedBlogId.id &&
    selectedPost.blog.id.username === authenticatedBlogId.username
)

export const selectSelectedBlogPosts = createSelector(
  selectPostFeature,
  state => state.selectedBlogPosts
)

export const selectEditedPost = createSelector(
  selectPostFeature,
  state => state.editor.editedPost
)

export const selectIsEditableMode = createSelector(
  selectPostFeature,
  state => state.editor.isEditingMode
)

export const selectIsModified = (modifiedTitle: string, modifiedContent: any) => createSelector(
  selectEditedPost,
  post => (!post) || post.title !== modifiedTitle || post.content !== modifiedContent
)
