import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostState} from "../reducers/post.reducers";

export const selectPostFeature = createFeatureSelector<PostState>('post')

export const selectFeedPostSearchResult = createSelector(
  selectPostFeature,
  state => state.feedSearchResult.posts
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