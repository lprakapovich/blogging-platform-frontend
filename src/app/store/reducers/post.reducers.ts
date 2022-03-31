import {BlogPost} from "../../models/BlogPost";
import {createReducer, on} from "@ngrx/store";
import * as PostActions from '../actions/post.actions';

export interface PostState {
  isLoading: boolean,
  postsFromSubscriptions: BlogPost[],
  selectedPost: BlogPost | null;
  postsBySearchCriteria: BlogPost[],
}

export const initialState: PostState = {
  isLoading: false,
  postsFromSubscriptions: [],
  selectedPost: null,
  postsBySearchCriteria: [],
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
    postsBySearchCriteria: action.posts
  })),

  on(PostActions.getPostsFromSubscriptions, (state) => ({
    ...state,
    isLoading: true
  })),

  on(PostActions.getPostsFromSubscriptionsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    postsFromSubscriptions: action.posts
  })),

  on(PostActions.setSelectedPost, (state, action) => ({
    ...state,
    selectedPost: action.post
  })),

  on(PostActions.unselectPost, (state) => ({
    ...state,
    selectedPost: null
  }))
)
