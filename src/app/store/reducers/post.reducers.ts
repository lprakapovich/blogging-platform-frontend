import {BlogPost} from "../../models/BlogPost";
import {createReducer, on} from "@ngrx/store";
import * as PostActions from '../actions/post.actions';
import * as AuthActions from "../actions/auth.actions";

export interface PostState {
  selectedBlogPosts: BlogPost[],
  postsFromSubscriptions: BlogPost[],
  postsBySearchCriteria: BlogPost[],
  selectedPost: BlogPost | null;
  isLoading: boolean,
  postsError: any
}

export const initialState: PostState = {
  selectedBlogPosts: [],
  isLoading: false,
  postsFromSubscriptions: [],
  selectedPost: null,
  postsBySearchCriteria: [],
  postsError: null
}

export const postReducer = createReducer(
  initialState,

  on(AuthActions.logout, (state) => ({
    ...state,
    selectedBlogPosts: [],
    isLoading: false,
    postsFromSubscriptions: [],
    selectedPost: null,
    postsBySearchCriteria: [],
    postsError: null
  })),

  on(PostActions.getPostsBySearchCriteria, (state) => ({
    ...state,
    isLoading: true
  })),

  on(PostActions.getPostsBySearchCriteriaSuccess, (state, action) => ({
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

  on(PostActions.resetSelectedPost, (state) => ({
    ...state,
    selectedPost: null
  })),

  on(PostActions.getPosts, (state) => ({
    ...state,
    isLoading: true
  })),

  on(PostActions.getPostsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    selectedBlogPosts: action.posts
  })),

  on(PostActions.getPostsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    postsError: action.error
  })),
)
