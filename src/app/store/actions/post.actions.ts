import {createAction, props} from "@ngrx/store";
import {BlogPost} from "../../models/BlogPost";

export enum PostActionTypes {

  GET_POSTS_BY_SEARCH_CRITERIA = "[Post] Get posts by title",
  GET_POSTS_BY_TITLE_SUCCESS = "[Post] Get posts by title success",
  GET_POSTS_FROM_SUBSCRIPTIONS = "[Post] Get subscriptions most recent posts",
  GET_POSTS_FROM_SUBSCRIPTIONS_SUCCESS = "[Post] Get subscriptions most recent posts success",
  SET_SELECTED_POST = "[Post] Select post",
  UNSELECT_POST = "[Post] Unselect post"
}

export const getPostsByTitle = createAction(PostActionTypes.GET_POSTS_BY_SEARCH_CRITERIA, props<{title: string}>())

export const getPostsByTitleSuccess = createAction(PostActionTypes.GET_POSTS_BY_TITLE_SUCCESS, props<{posts: BlogPost[] }>())

export const getPostsFromSubscriptions = createAction(PostActionTypes.GET_POSTS_FROM_SUBSCRIPTIONS)

export const getPostsFromSubscriptionsSuccess = createAction(PostActionTypes.GET_POSTS_FROM_SUBSCRIPTIONS_SUCCESS, props<{posts: BlogPost[] }>())

export const setSelectedPost = createAction(PostActionTypes.SET_SELECTED_POST, props<{post: BlogPost}>())

export const unselectPost = createAction(PostActionTypes.UNSELECT_POST)
