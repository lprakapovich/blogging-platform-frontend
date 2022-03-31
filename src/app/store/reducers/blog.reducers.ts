import {Blog} from "../../models/Blog";
import {createReducer, on} from "@ngrx/store";
import * as BlogActions from "../actions/blog.actions";

export interface BlogState {
  currentBlogId: string,
  selectedBlogId: string,
  blogError: string,
  isLoading: boolean,
  blogsBySearchCriteria: Blog[],
  userBlogIds: string[]
}

export const initialState: BlogState = {
  currentBlogId: '',
  selectedBlogId: '',
  blogError: '',
  isLoading: false,
  blogsBySearchCriteria: [],
  userBlogIds: []
}

export const blogReducer = createReducer(
  initialState,

  on(BlogActions.getBlogDetails, (state) => ({
    ...state,
    isLoading: true
  })),

  on(BlogActions.getBlogDetailsSuccess, (state) => ({
    ...state,
    isLoading: false,
    blogError: ''
  })),

  on(BlogActions.getBlogDetailsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    blogError: action.error
  })),

  on(BlogActions.setSelectedBlogId, (state, action) => ({
    ...state,
    selectedBlogId: action.blogId,
  })),

  on(BlogActions.setUserBlogsIds, (state, action) => ({
    ...state,
    userBlogIds: action.blogIds
  })),

  on(BlogActions.getBlogsBySearchCriteria, (state) => ({
    ...state,
    isLoading: true,
    blogsBySearchCriteria: []
  })),

  on(BlogActions.getBlogsBySearchCriteriaSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    blogsBySearchCriteria: action.blogs
  })),

  on(BlogActions.getUserBlogsIds, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(BlogActions.getUserBlogsIdsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    userBlogIds: action.blogIds,
    selectedBlogId: action.blogIds[0]
  })),

  on(BlogActions.getUserBlogsIdsSuccessAndRedirect, (state, action) => ({
    ...state,
    isLoading: false,
    userBlogIds: action.blogIds,
    selectedBlogId: action.blogIds[0]
  })),

  on(BlogActions.createBlog, (state) => ({
    ...state,
    isLoading: true
  })),

  on(BlogActions.createBlogSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    userBlogIds: [
      ...state.userBlogIds,
      action.blogId
    ]
  })),

  on(BlogActions.createBlogFailure, (state, action) => ({
    ...state,
    isLoading: false,
    blogError: action.error
  }))
)
