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

  editor: {
    editedPost: BlogPost | null;
    isModified: boolean;
  }
}

export const initialState: PostState = {
  selectedBlogPosts: [],
  isLoading: false,
  postsFromSubscriptions: [],
  selectedPost: null,
  postsBySearchCriteria: [],
  postsError: null,

  editor: {
    editedPost: null,
    isModified: false
  }
}

export const postReducer = createReducer(
  initialState,

  on(AuthActions.logout, (state) => ({
    ...state,
    selectedBlogPosts: [],
    isLoading: false,
    postsFromSubscriptions: [],
    selectedPost: {} as BlogPost,
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
    selectedPost: {} as BlogPost
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

  on(PostActions.createPost, (state) => ({
    ...state,
    isLoading: true
  })),

  on(PostActions.createPostSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    selectedPost: action.createdPost
  })),

  on(PostActions.createPostFailure, (state, action) => ({
    ...state,
    isLoading: false,
    postsError: action.error
  })),

  on(PostActions.updatePost, (state) => ({
    ...state,
    isLoading: true
  })),

  on(PostActions.updatePostSuccess, (state) => ({
    ...state,
    isLoading: false
  })),

  on(PostActions.updatePostFailure, (state, action) => ({
    ...state,
    isLoading: false,
    postsError: action.error
  })),

  on(PostActions.deletePost, (state) => ({
    ...state,
    isLoading: true
  })),

  on(PostActions.deletePostSuccess, (state) => ({
    ...state,
    isLoading: false
  })),

  on(PostActions.deletePostFailure, (state, action) => ({
    ...state,
    isLoading: false,
    postsError: action.error
  })),

  on(PostActions.setEditedPostSuccess, (state, action) => ({
    ...state,
    editor: {
      ...state.editor,
      editedPost: action.post
    }
  })),

  on(PostActions.resetEditedPost, (state, action) => ({
    ...state,
    editor: {
      ...state.editor,
      editedPost: null
    }
  }))
)
