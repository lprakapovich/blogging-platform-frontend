import {Blog} from "../../models/Blog";
import {createReducer, on} from "@ngrx/store";
import * as BlogActions from "../actions/blog.actions";
import {BlogView} from "../../models/BlogView";

export interface BlogState {
  authenticatedUserBlogId: string,
  authenticatedUserBlog: BlogView,
  selectedBlogId: string,
  blogError: string,
  isLoading: boolean,
  blogsBySearchCriteria: Blog[],
  userBlogIds: string[],
  userBlogs: BlogView[]
}

export const initialState: BlogState = {
  authenticatedUserBlogId: '',
  authenticatedUserBlog: {} as BlogView,
  selectedBlogId: '',
  blogError: '',
  isLoading: false,
  blogsBySearchCriteria: [],
  userBlogIds: [],
  userBlogs: []
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
    selectedBlogId: action.blogId,
    authenticatedUserBlogId: action.blogId,
  })),

  on(BlogActions.getBlogDetailsAndRedirectSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    authenticatedUserBlog: action.blog
  })),

  on(BlogActions.setSelectedBlogId, (state, action) => ({
    ...state,
    selectedBlogId: action.blogId,
  })),

  on(BlogActions.setBlogIdAndRedirect, (state, action) => ({
    ...state,
    selectedBlogId: action.blogId,
    authenticatedUserBlogId: action.blogId,
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
    authenticatedUserBlogId: action.blogIds[0]
  })),

  on(BlogActions.getUserBlogsIdsSuccessAndRedirect, (state, action) => ({
    ...state,
    isLoading: false,
    userBlogIds: action.blogIds,
    authenticatedUserBlogId: action.blogIds[0],
  })),

  on(BlogActions.getUserBlogsAndRedirect, (state) => ({
    ...state,
    isLoading: true
  })),

  on(BlogActions.getUserBlogsAndRedirectSuccess, (state, action) => ({
    ...state,
    userBlogs: action.blogs,
    userBlogIds: action.blogs.map(b => b.id.id),
    authenticatedUserBlog: action.blogs.length > 0 ? action.blogs[0] : {} as BlogView,
    authenticatedUserBlogId: action.blogs.length > 0 ? action.blogs[0].id.id : ''
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
