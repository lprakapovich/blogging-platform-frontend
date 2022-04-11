import {createAction, props} from "@ngrx/store";
import {BlogPost} from "../../models/BlogPost";
import {CreatePostData} from "../../models/data/post/CreatePostData";
import {UpdatePostData} from "../../models/data/post/UpdatePostData";

export enum PostActionTypes {

  CREATE_POST = "[post] create post",
  CREATE_POST_SUCCESS = "[post] create post success",
  CREATE_POST_FAILURE = "[post] create post failure",

  DELETE_POST = "[post] delete post",
  DELETE_POST_SUCCESS = "[post] delete post success",
  DELETE_POST_FAILURE = "[post] delete post failure",

  UPDATE_POST = "[post] update post",
  UPDATE_POST_SUCCESS = "[post] update post success",
  UPDATE_POST_FAILURE = "[post] update post failure",

  GET_POSTS = "[post] get posts",
  GET_POSTS_SUCCESS = "[post] get posts success",
  GET_POSTS_FAILURE = "[post] get posts failure",

  GET_POSTS_BY_SEARCH_CRITERIA = "[post] get posts by title",
  GET_POSTS_BY_SEARCH_CRITERIA_SUCCESS = "[post] get posts by title success",
  GET_POSTS_BY_SEARCH_CRITERIA_FAILURE = "[post] get posts by title failure",

  GET_POSTS_FROM_SUBSCRIPTIONS = "[post] get most recent posts from subscriptions",
  GET_POSTS_FROM_SUBSCRIPTIONS_SUCCESS = "[post] get most recent posts from subscriptions success",
  GET_POSTS_FROM_SUBSCRIPTIONS_FAILURE = "[post] get most recent posts from subscriptions failure",

  SET_SELECTED_POST = "[post] set selected post",
  RESET_SELECTED_POST = "[post] reset selected post",

  SET_EDITED_POST = "[post] set edited post",
  SET_EDITED_POST_SUCCESS = "[post] set edited post success",
  SET_EDITED_POST_FAILURE = "[post] set edited post failure",
  RESET_EDITED_POST = "[post] reset edited post"
}

export const createPost = createAction(PostActionTypes.CREATE_POST, props<{createPostData: CreatePostData}>())
export const createPostSuccess = createAction(PostActionTypes.CREATE_POST_SUCCESS, props<{createdPost: BlogPost}>());
export const createPostFailure = createAction(PostActionTypes.CREATE_POST_FAILURE, props<{error: any}>())

export const updatePost = createAction(PostActionTypes.UPDATE_POST, props<{postId: number, updatePostData: UpdatePostData}>())
export const updatePostSuccess = createAction(PostActionTypes.UPDATE_POST_SUCCESS, props<{updatedPost: BlogPost}>())
export const updatePostFailure = createAction(PostActionTypes.UPDATE_POST_FAILURE, props<{error: any}>())

export const deletePost = createAction(PostActionTypes.DELETE_POST, props<{postId: number}>())
export const deletePostSuccess = createAction(PostActionTypes.DELETE_POST_SUCCESS, props<{postId: number}>())
export const deletePostFailure = createAction(PostActionTypes.DELETE_POST_FAILURE, props<{error: any}>())

export const getPostsBySearchCriteria = createAction(PostActionTypes.GET_POSTS_BY_SEARCH_CRITERIA, props<{title: string}>())
export const getPostsBySearchCriteriaSuccess = createAction(PostActionTypes.GET_POSTS_BY_SEARCH_CRITERIA_SUCCESS, props<{posts: BlogPost[] }>())
export const getPostsBySearchCriteriaFailure = createAction(PostActionTypes.GET_POSTS_BY_SEARCH_CRITERIA_FAILURE, props<{error: any}>())

export const getPostsFromSubscriptions = createAction(PostActionTypes.GET_POSTS_FROM_SUBSCRIPTIONS)
export const getPostsFromSubscriptionsSuccess = createAction(PostActionTypes.GET_POSTS_FROM_SUBSCRIPTIONS_SUCCESS, props<{posts: BlogPost[] }>())
export const getPostsFromSubscriptionsFailure = createAction(PostActionTypes.GET_POSTS_FROM_SUBSCRIPTIONS_FAILURE, props<{error: any}>())

export const setSelectedPost = createAction(PostActionTypes.SET_SELECTED_POST, props<{post: BlogPost}>())
export const resetSelectedPost = createAction(PostActionTypes.RESET_SELECTED_POST)

export const setEditedPost = createAction(PostActionTypes.SET_EDITED_POST);
export const setEditedPostSuccess = createAction(PostActionTypes.SET_EDITED_POST_SUCCESS, props<{post: BlogPost}>());
export const setEditedPostFailure = createAction(PostActionTypes.SET_EDITED_POST_FAILURE);
export const resetEditedPost = createAction(PostActionTypes.RESET_EDITED_POST);

export const getPosts = createAction(PostActionTypes.GET_POSTS, props<{status?: string, categoryId?: number}>())
export const getPostsSuccess = createAction(PostActionTypes.GET_POSTS_SUCCESS, props<{posts: BlogPost[]}>())
export const getPostsFailure = createAction(PostActionTypes.GET_POSTS_FAILURE, props<{error: any}>())
