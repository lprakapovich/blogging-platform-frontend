import {Blog} from "../../models/Blog";
import {createReducer, on} from "@ngrx/store";
import * as BlogActions from "../actions/blog.actions";

export interface BlogState {
  selectedBlogId: string;
  selectedBlog: Blog | null;
  blogError: string | null;
  isLoading: boolean,
  feedSearchResult: {
    blogs: Blog[]
  }
}

export const initialState: BlogState = {
  selectedBlogId: '',
  selectedBlog: null,
  blogError: null,
  isLoading: false,
  feedSearchResult: {
    blogs: []
  }
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
    blogError: null
  })),

  on(BlogActions.getBlogDetailsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    blogError: action.error
  })),

  on(BlogActions.setSelectedBlogId, (state, action) => ({
    ...state,
    selectedBlogId: action.blogId
  })),

  on(BlogActions.getBlogsBySearchCriteria, (state) => ({
    ...state,
    isLoading: true
  })),

  on(BlogActions.getBlogsBySearchCriteriaSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    feedSearchResult: {
      blogs: action.blogs
    }
  }))
)
