import {createAction, props} from "@ngrx/store";
import {BlogPost} from "../../models/BlogPost";

export enum PostActionTypes {

  GET_POSTS = "[Post] Get posts",
  GET_POSTS_SUCCESS = "[Post] Get posts success",
  GET_POSTS_FAILURE = "[Post] Get posts failure",

  GET_POSTS_BY_SEARCH_CRITERIA = "[Post] Get posts by title",
  GET_POSTS_BY_SEARCH_CRITERIA_SUCCESS = "[Post] Get posts by title success",

  GET_POSTS_FROM_SUBSCRIPTIONS = "[Post] Get subscriptions most recent posts",
  GET_POSTS_FROM_SUBSCRIPTIONS_SUCCESS = "[Post] Get subscriptions most recent posts success",

  SET_SELECTED_POST = "[Post] Select post",
  RESET_SELECTED_POST = "[Post] Reset selected post"
}

export const getPostsBySearchCriteria = createAction(PostActionTypes.GET_POSTS_BY_SEARCH_CRITERIA, props<{title: string}>())
export const getPostsBySearchCriteriaSuccess = createAction(PostActionTypes.GET_POSTS_BY_SEARCH_CRITERIA_SUCCESS, props<{posts: BlogPost[] }>())

export const getPostsFromSubscriptions = createAction(PostActionTypes.GET_POSTS_FROM_SUBSCRIPTIONS)
export const getPostsFromSubscriptionsSuccess = createAction(PostActionTypes.GET_POSTS_FROM_SUBSCRIPTIONS_SUCCESS, props<{posts: BlogPost[] }>())

export const setSelectedPost = createAction(PostActionTypes.SET_SELECTED_POST, props<{post: BlogPost}>())
export const resetSelectedPost = createAction(PostActionTypes.RESET_SELECTED_POST)

export const getPosts = createAction(PostActionTypes.GET_POSTS, props<{status: string, category?: string}>())
export const getPostsSuccess = createAction(PostActionTypes.GET_POSTS_SUCCESS, props<{posts: BlogPost[]}>())
export const getPostsFailure = createAction(PostActionTypes.GET_POSTS_FAILURE, props<{error: any}>())
