import {createAction, props} from "@ngrx/store";
import {BlogPost} from "../../models/BlogPost";

export enum PostActionTypes {

  GET_POSTS_BY_TITLE = "[Post] Get posts by title",
  GET_POSTS_BY_TITLE_SUCCESS = "[Post] Get posts by title success",
}

export const getPostsByTitle = createAction(PostActionTypes.GET_POSTS_BY_TITLE, props<{title: string}>())

export const getPostsByTitleSuccess = createAction(PostActionTypes.GET_POSTS_BY_TITLE_SUCCESS, props<{
  posts: BlogPost[]
}>())
