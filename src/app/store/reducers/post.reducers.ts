import {BlogPost} from "../../models/BlogPost";
import {createReducer, on} from "@ngrx/store";
import * as PostActions from '../actions/post.actions';
import * as AuthActions from "../actions/auth.actions";

export interface PostState {
  userBlogPosts: BlogPost[],
  isLoading: boolean,
  postsFromSubscriptions: BlogPost[],
  selectedPost: BlogPost | null;
  postsBySearchCriteria: BlogPost[],
  postsError: any
}

export const initialState: PostState = {
  userBlogPosts: [],
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
    userBlogPosts: [],
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
    userBlogPosts: action.posts
  })),

  on(PostActions.getPostsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    postsError: action.error
  })),
)
