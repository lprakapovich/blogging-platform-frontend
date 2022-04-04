import {Blog} from "../../models/Blog";
import {createReducer, on} from "@ngrx/store";
import * as BlogActions from "../actions/blog.actions";
import {BlogView} from "../../models/BlogView";

export interface BlogState {
  authenticatedUserBlog: BlogView,
  userBlogs: BlogView[]

  selectedBlog: BlogView,

  blogError: string,
  isLoading: boolean,

  blogsBySearchCriteria: Blog[],
}

export const initialState: BlogState = {
  authenticatedUserBlog: {} as BlogView,
  userBlogs: [],

  selectedBlog: {} as BlogView,

  blogError: '',
  isLoading: false,

  blogsBySearchCriteria: [],
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

  on(BlogActions.getBlogDetailsAndRedirect, (state, action) => ({
    ...state,
    isLoading: true,
  })),

  on(BlogActions.getBlogDetailsAndRedirectSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    authenticatedUserBlog: action.isPrincipal ? action.blog : state.authenticatedUserBlog,
    selectedBlog: action.blog
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

  on(BlogActions.getUserBlogsAndRedirect, (state) => ({
    ...state,
    isLoading: true
  })),

  on(BlogActions.getUserBlogsAndRedirectSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    userBlogs: action.blogs,
    authenticatedUserBlog: action.blogs.length > 0 ? action.blogs[0] : {} as BlogView,
    selectedBlog: action.blogs.length > 0 ? action.blogs[0] : {} as BlogView
  })),

  on(BlogActions.createBlog, (state) => ({
    ...state,
    isLoading: true
  })),

  on(BlogActions.createBlogSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    authenticatedUserBlog: {
      id: {
        id: action.blogId,
        username: action.principal
      },
      numberOfSubscribers: 0,
      numberOfSubscriptions: 0,
      categories: [],
      description: '',
      displayName: ''
    },

    userBlogs: [
      ...state.userBlogs,
      {
        id: {
          id: action.blogId,
          username: action.principal
        },
        numberOfSubscribers: 0,
        numberOfSubscriptions: 0,
        categories: [],
        description: '',
        displayName: ''
      }
    ]
  })),

  on(BlogActions.createBlogFailure, (state, action) => ({
    ...state,
    isLoading: false,
    blogError: action.error
  })),

  on(BlogActions.updateBlog, (state) => ({
    ...state,
    isLoading: true
  })),

  on(BlogActions.updateBlogSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    authenticatedUserBlog: {
      ...state.authenticatedUserBlog,
      displayName: action.updatedBlog.displayName,
      description: action.updatedBlog.description
    }
  })),

  on(BlogActions.updateBlogFailure, (state) => ({
    ...state,
    isLoading: false
  }))
)
