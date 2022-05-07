import {Blog, BlogId} from "../../models/Blog";
import {createReducer, on} from "@ngrx/store";
import * as BlogActions from "../actions/blog.actions";
import {BlogView} from "../../models/BlogView";
import * as CategoryActions from "../actions/category.actions";
import * as SubscriptionActions from "../actions/subscription.actions";
import * as AuthActions from "../actions/auth.actions";

export interface BlogState {
  principalActiveBlog: BlogView,
  principalManagedBlogIds: BlogId[]
  selectedBlog: BlogView
  loading: {
    isCreateLoading: boolean;
    isUpdateLoading: boolean;
    isDeleteLoading: boolean;
    isGetLoading: boolean;
  },
  search: {
    blogs: Blog[]
  },
  error: {
    responseError: any
  },
}

export const initialState: BlogState = {
  principalActiveBlog: {} as BlogView,
  principalManagedBlogIds: [],
  selectedBlog: {} as BlogView,
  loading: {
    isCreateLoading: false,
    isUpdateLoading: false,
    isDeleteLoading: false,
    isGetLoading: false
  },
  search: {
    blogs: []
  },
  error: {
    responseError: null
  },
}

export const blogReducer = createReducer(
  initialState,

  on(BlogActions.createBlog, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      isCreateLoading: true
    },
    error: {
      responseError: null
    }
  })),

  on(BlogActions.createBlogSuccess, (state, action) => ({
    ...state,
    principalActiveBlog: Object.keys(state.principalActiveBlog).length === 0  ? {
      id: {
        id: action.blogId, username: action.principal },
        subscribers: [],
        subscriptions: [],
        categories: [],
        description: '',
        displayName: ''
    } : state.principalActiveBlog,

    selectedBlog: Object.keys(state.selectedBlog).length === 0  ? {
      id: {
        id: action.blogId, username: action.principal },
        subscribers: [],
        subscriptions: [],
        categories: [],
        description: '',
        displayName: ''
    } : state.selectedBlog,

    principalManagedBlogIds: [...state.principalManagedBlogIds, { id: action.blogId, username: action.principal }],
    loading: {
      ...state.loading,
      isCreateLoading: false
    },
  })),

  on(BlogActions.createBlogFailure, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isCreateLoading: false
    },
    error: {
      responseError: action.error
    }
  })),

  on(BlogActions.updateBlog, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      isUpdateLoading: true
    },
    error: {
      responseError: null
    }
  })),

  on(BlogActions.updateBlogSuccess, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isUpdateLoading: false
    },
    principalActiveBlog: {
      ...state.principalActiveBlog,
      displayName: action.updatedBlog.displayName,
      description: action.updatedBlog.description
    },

    selectedBlog:
      Object.keys(state.selectedBlog).length > 0 &&
      state.selectedBlog.id.id === action.updatedBlog.id.id &&
      state.selectedBlog.id.username === action.updatedBlog.id.username ?
        {...state.selectedBlog,
          displayName: action.updatedBlog.displayName,
          description: action.updatedBlog.description} : state.selectedBlog
  })),

  on(BlogActions.updateBlogFailure, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isUpdateLoading: false
    },
    error: {
      responseError: action.error
    }
  })),

  on(BlogActions.deleteBlog, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      isDeleteLoading: true
    },
    error: {
      responseError: null
    }
  })),

  on(BlogActions.deleteBlogSuccess, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isDeleteLoading: false
    },
    principalManagedBlogIds: state.principalManagedBlogIds.filter(i => i.id !== action.blogId.id)
  })),

  on(BlogActions.deleteBlogFailure, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isDeleteLoading: false
    },
    error: {
      responseError: action.error
    }
  })),

  on(BlogActions.getBlogDetailsAndRedirect, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: true
    },
  })),

  on(BlogActions.getBlogDetailsAndRedirectSuccess, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: false
    },
    selectedBlog: action.blog,
    principalActiveBlog: action.isPrincipal ? action.blog : state.principalActiveBlog,
  })),

  on(BlogActions.getBlogDetailsAndRedirectFailure, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: false
    },
    error: {
      responseError: action.error()
    }
  })),

  on(BlogActions.getBlogDetails, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: true
    },
  })),

  on(BlogActions.getBlogDetailsSuccess, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: false
    },
    principalActiveBlog: action.isPrincipal ? action.blog : state.principalActiveBlog,
    selectedBlog: action.blog
  })),

  on(BlogActions.getBlogDetailsFailure, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: false
    },
    blogError: action.error
  })),

  on(BlogActions.getSearchedBlogs, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: true
    },
    search: {
      blogs: []
    }
  })),

  on(BlogActions.getSearchedBlogsSuccess, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: false
    },
    search: {
      blogs: action.blogs
    }
  })),

  on(BlogActions.getSearchedBlogsFailure, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: false
    },
    error: {
      responseError: action.error
    }
  })),

  on(BlogActions.getPrincipalBlogsAndRedirect, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: true
    },
  })),

  on(BlogActions.getPrincipalBlogsAndRedirectSuccess, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: false
    },
    principalManagedBlogIds: action.blogs.map(id => id.id),
    principalActiveBlog: action.blogs.length > 0 ? action.blogs[0] : {} as BlogView,
    selectedBlog: action.blogs.length > 0 ? action.blogs[0] : {} as BlogView
  })),

  on(BlogActions.getPrincipalBlogsAndRedirectFailure, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: false
    },
    error: {
      responseError: action.error
    }
  })),

  // FIXME [category] action in blog reducer
  on(CategoryActions.deleteCategorySuccess, (state, action) => ({
    ...state,
    principalActiveBlog: {
      ...state.principalActiveBlog,
      categories: state.principalActiveBlog.categories.filter(c => c.id !== action.categoryId)
    },
    selectedBlog: {
      ...state.selectedBlog,
      categories: state.selectedBlog.id.id === state.principalActiveBlog.id.id && state.selectedBlog.id.username === state.principalActiveBlog.id.username ?
        state.selectedBlog.categories.filter(c => c.id !== action.categoryId) : state.selectedBlog.categories
    }
  })),

  // FIXME [category] action in blog reducer
  on(CategoryActions.createCategorySuccess, (state, action) => ({
    ...state,
    principalActiveBlog: {
      ...state.principalActiveBlog,
      categories: [...state.principalActiveBlog.categories, action.category]
    },
    selectedBlog: {
      ...state.selectedBlog,
      categories: state.selectedBlog.id.id === state.principalActiveBlog.id.id && state.selectedBlog.id.username === state.principalActiveBlog.id.username ?
        [...state.selectedBlog.categories, action.category] :
        state.selectedBlog.categories
    }
  })),

  // FIXME [subscription] action in blog reducer
  on(SubscriptionActions.createSubscriptionSuccess, (state, action) => ({
    ...state,
    principalActiveBlog: {
      ...state.principalActiveBlog,
      subscriptions: [
        ...state.principalActiveBlog.subscriptions,
        action.subscription
      ]
    },

    selectedBlog: {
      ...state.selectedBlog,
      subscriptions: state.selectedBlog.id.id === state.principalActiveBlog.id.id && state.selectedBlog.id.username === state.principalActiveBlog.id.username ?
        [...state.selectedBlog.subscriptions, action.subscription] :
        state.selectedBlog.subscriptions
    }
  })),

  // FIXME [subscription] action in blog reducer
  on(SubscriptionActions.deleteSubscriptionSuccess, (state, action) => ({
    ...state,
    principalActiveBlog: {
      ...state.principalActiveBlog,
      subscriptions: state.principalActiveBlog.subscriptions.filter(
        s => s.id.subscription.id !== action.unsubscribedBlogId.id && s.id.subscription.username !== action.unsubscribedBlogId.username)
    },

    selectedBlog: {
      ...state.selectedBlog,

      // if selected blog is principalActive
      subscriptions: state.selectedBlog.id.id === state.principalActiveBlog.id.id && state.selectedBlog.id.username === state.principalActiveBlog.id.username ?

        // then filter subscription out
        state.selectedBlog.subscriptions.filter(s =>
          s.id.subscription.id !== action.unsubscribedBlogId.id &&
          s.id.subscription.username !== action.unsubscribedBlogId.username) :

        // or else leave as it was
        state.selectedBlog.subscriptions
    }
  })),

  // FIXME [auth] action in blog reducer
  on(AuthActions.logout, (state) => ({
    ...state,

    principalActiveBlog: {} as BlogView,
    principalManagedBlogIds: [],
    selectedBlog: {} as BlogView,

    error: {
      responseError: null
    },

    loading: {
      isCreateLoading: false,
      isUpdateLoading: false,
      isDeleteLoading: false,
      isGetLoading: false
    },

    search: {
      blogs: []
    }
  })),
)
