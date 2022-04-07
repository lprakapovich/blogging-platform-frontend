import {Blog, BlogId} from "../../models/Blog";
import {createReducer, on} from "@ngrx/store";
import * as BlogActions from "../actions/blog.actions";
import {BlogView} from "../../models/BlogView";
import * as CategoryActions from "../actions/category.actions";
import * as SubscriptionActions from "../actions/subscription.actions";
import * as AuthActions from "../actions/auth.actions";

export interface BlogState {
  authenticatedUserBlog: BlogView,
  authenticatedUserBlogsIds: BlogId[],
  searchedBlogs: Blog[],
  selectedBlog: BlogView,
  blogError: string,
  isLoading: boolean,
}

export const initialState: BlogState = {
  authenticatedUserBlog: {} as BlogView,
  authenticatedUserBlogsIds: [],
  searchedBlogs: [],
  selectedBlog: {} as BlogView,
  blogError: '',
  isLoading: false,
}

export const blogReducer = createReducer(
  initialState,

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
      subscribers: [],
      subscriptions: [],
      categories: [],
      description: '',
      displayName: ''
    },

    authenticatedUserBlogsIds: [
      ...state.authenticatedUserBlogsIds,
      {
        id: action.blogId,
        username: action.principal
      }
    ],
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
  })),

  on(BlogActions.getBlogDetailsAndRedirect, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(BlogActions.getBlogDetailsAndRedirectSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    authenticatedUserBlog: action.isPrincipal ? action.blog : state.authenticatedUserBlog,
    selectedBlog: action.blog
  })),

  on(BlogActions.getSearchedBlogs, (state) => ({
    ...state,
    isLoading: true,
    searchedBlogs: []
  })),

  on(BlogActions.getSearchedBlogsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    searchedBlogs: action.blogs
  })),

  on(BlogActions.getUserBlogsAndRedirect, (state) => ({
    ...state,
    isLoading: true
  })),

  on(BlogActions.getUserBlogsAndRedirectSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    authenticatedUserBlogsIds: action.blogs.map(b => b.id),
    authenticatedUserBlog: action.blogs.length > 0 ? action.blogs[0] : {} as BlogView,
    selectedBlog: action.blogs.length > 0 ? action.blogs[0] : {} as BlogView
  })),

  on(BlogActions.getUserBlogsAndRedirectFailure, (state, action) => ({
    ...state,
    isLoading: false,
    blogError: action.error
  })),

  // FIXME [category] action in blog reducer
  on(CategoryActions.deleteCategorySuccess, (state, action) => ({
    ...state,
    isLoading: false,
    authenticatedUserBlog: {
      ...state.authenticatedUserBlog,
      categories: state.authenticatedUserBlog.categories.filter(c => c.id !== action.categoryId)
    },
    selectedBlog: {
      ...state.selectedBlog,
      categories: state.selectedBlog.id === state.authenticatedUserBlog.id ?
        state.selectedBlog.categories.filter(c => c.id !== action.categoryId) : state.selectedBlog.categories
    }
  })),

  on(CategoryActions.createCategorySuccess, (state, action) => ({
    ...state,
    authenticatedUserBlog: {
      ...state.authenticatedUserBlog,
      categories: [...state.authenticatedUserBlog.categories, action.category]
    },
    selectedBlog: {
      ...state.selectedBlog,
      categories: state.selectedBlog.id === state.authenticatedUserBlog.id ?
        [...state.selectedBlog.categories, action.category] :
        state.selectedBlog.categories
    }
  })),

  // FIXME [subscription] action in blog reducer
  on(SubscriptionActions.createSubscriptionSuccess, (state, action) => ({
    ...state,
    authenticatedUserBlog: {
      ...state.authenticatedUserBlog,
      subscriptions: [
        ...state.authenticatedUserBlog.subscriptions,
        action.subscription
      ]
    },

    selectedBlog: {
      ...state.selectedBlog,
      subscriptions: state.selectedBlog.id === state.authenticatedUserBlog.id ?
        [...state.selectedBlog.subscriptions, action.subscription] :
        state.selectedBlog.subscriptions
    }
  })),

  on(SubscriptionActions.deleteSubscriptionSuccess, (state, action) => ({
    ...state,
    authenticatedUserBlog: {
      ...state.authenticatedUserBlog,
      subscriptions: state.authenticatedUserBlog.subscriptions.filter(s => s.id.subscription !== action.unsubscribedBlogId)
    },

    selectedBlog: {
      ...state.selectedBlog,
      subscriptions: state.selectedBlog.id === state.authenticatedUserBlog.id ?
        state.selectedBlog.subscriptions.filter(s => s.id.subscription !== action.unsubscribedBlogId) :
        state.selectedBlog.subscriptions
    }
  })),

  // FIXME [auth] action in blog reducer
  on(AuthActions.logout, (state) => ({
    ...state,
    authenticatedUserBlog: {} as BlogView,
    authenticatedUserBlogsIds: [],
    searchedBlogs: [],
    selectedBlog: {} as BlogView,
    blogError: '',
    isLoading: false,
  })),
)
