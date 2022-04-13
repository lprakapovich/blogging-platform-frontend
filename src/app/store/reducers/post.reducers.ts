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
    isEditingMode: boolean;
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
    isModified: false,
    isEditingMode: false,
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
    selectedPost: action.post,
    selectedBlogPosts: [
      ...state.selectedBlogPosts, action.post
    ]
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

  on(PostActions.updatePostSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    selectedPost: action.post,
    editor: {
      ...state.editor,
      isEditingMode: false,
      editedPost: null,
    },
    selectedBlogPosts: [
      ...state.selectedBlogPosts.filter(p => p.id !== action.post.id),
      action.post
    ]
  })),

  on(PostActions.updatePostFailure, (state, action) => ({
    ...state,
    isLoading: false,
    postsError: action.error,
    editor: {
      ...state.editor,
      isEditingMode: false,
      editedPost: null
    }
  })),

  on(PostActions.deletePost, (state) => ({
    ...state,
    isLoading: true
  })),

  on(PostActions.deletePostSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    selectedPost: state.selectedPost?.id === action.postId ? null : state.selectedPost,
    selectedBlogPosts: state.selectedBlogPosts.filter(p => p.id !== action.postId),
    editor: {
      ...state.editor,
      editedPost: state.editor.editedPost?.id === action.postId ? null : state.editor.editedPost
    }
  })),

  on(PostActions.deletePostFailure, (state, action) => ({
    ...state,
    isLoading: false,
    postsError: action.error
  })),

  on(PostActions.setEditedPost, (state) => ({
    ...state
  })),

  on(PostActions.setEditedPostSuccess, (state, action) => ({
    ...state,
    editor: {
      ...state.editor,
      editedPost: action.post,
      isEditingMode: true
    }
  })),

  on(PostActions.resetEditedPost, (state) => ({
    ...state,
    editor: {
      ...state.editor,
      editedPost: null,
      isEditingMode: false
    }
  }))
)
