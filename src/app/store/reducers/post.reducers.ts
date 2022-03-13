import {BlogPost} from "../../models/BlogPost";
import {createReducer, on} from "@ngrx/store";
import * as PostActions from '../actions/post.actions';

export interface PostState {
  isLoading: boolean,
  postsFromSubscriptions: BlogPost[],
  feedSearchResult: {
    posts: BlogPost[]
  }
}

export const initialState: PostState = {
  isLoading: false,
  postsFromSubscriptions: [],
  feedSearchResult: {
    posts: []
  }
}

export const postReducer = createReducer(
  initialState,

  on(PostActions.getPostsByTitle, (state) => ({
    ...state,
    isLoading: true
  })),

  on(PostActions.getPostsByTitleSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    feedSearchResult: {
      posts: action.posts
    }
  })),

  on(PostActions.getPostsFromSubscriptions, (state) => ({
    ...state,
    isLoading: true
  })),

  on(PostActions.getPostsFromSubscriptionsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    postsFromSubscriptions: action.posts
  }))
)
