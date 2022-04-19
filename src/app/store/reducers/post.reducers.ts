import {BlogPost} from "../../models/BlogPost";
import {createReducer, on} from "@ngrx/store";
import * as PostActions from '../actions/post.actions';
import * as AuthActions from "../actions/auth.actions";

export interface PostState {
  selectedPost: BlogPost | null;
  selectedBlogPosts: BlogPost[],
  postsFromSubscriptions: BlogPost[],

  search: {
    searchedPosts: BlogPost[],
  }

  loading: {
    isCreateLoading: boolean;
    isUpdateLoading: boolean;
    isDeleteLoading: boolean;
    isGetLoading: boolean;
  },

  editor: {
    editedPost: BlogPost | null;
    isModified: boolean;
    isEditingMode: boolean;
  },

  error: {
    responseError: any
  },
}

export const initialState: PostState = {
  selectedBlogPosts: [],
  postsFromSubscriptions: [],
  selectedPost: null,

  search: {
    searchedPosts: []
  },

  loading: {
    isCreateLoading: false,
    isUpdateLoading: false,
    isDeleteLoading: false,
    isGetLoading: false
  },

  editor: {
    editedPost: null,
    isModified: false,
    isEditingMode: false,
  },

  error: {
    responseError: null
  },
}

export const postReducer = createReducer(
  initialState,

  on(AuthActions.logout, (state) => ({
    ...state,
    selectedBlogPosts: [],
    postsFromSubscriptions: [],
    selectedPost: null,

    search: {
      searchedPosts: []
    },

    loading: {
      isCreateLoading: false,
      isUpdateLoading: false,
      isDeleteLoading: false,
      isGetLoading: false
    },

    editor: {
      editedPost: null,
      isModified: false,
      isEditingMode: false,
    },

    error: {
      responseError: null
    },

  })),

  on(PostActions.getPostsBySearchCriteria, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: true
    }
  })),

  on(PostActions.getPostsBySearchCriteriaSuccess, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: false
    },
    search: {
      searchedPosts: action.posts
    }
  })),

  on(PostActions.getPostsBySearchCriteriaFailure, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: false
    },
    error: {
      responseError: action.error
    }
  })),

  on(PostActions.getPostsFromSubscriptions, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: true
    }
  })),

  on(PostActions.getPostsFromSubscriptionsSuccess, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: false
    },
    postsFromSubscriptions: action.push ? [...state.postsFromSubscriptions, ...action.posts] : action.posts
  })),

  on(PostActions.getPostsFromSubscriptionsFailure, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: false
    },
    error: {
      responseError: action.error
    }
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
    loading: {
      ...state.loading,
      isGetLoading: true
    }
  })),

  on(PostActions.getPostsSuccess, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: false
    },
    selectedBlogPosts: action.push ? [...state.selectedBlogPosts, ...action.posts] : action.posts
  })),

  on(PostActions.getPostsFailure, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isGetLoading: false
    },
    error: {
      responseError: action.error
    }
  })),

  on(PostActions.createPost, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      isCreateLoading: true
    },
  })),

  on(PostActions.createPostSuccess, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isCreateLoading: false
    },
    selectedPost: action.post,
    selectedBlogPosts: [
      ...state.selectedBlogPosts, action.post
    ]
  })),

  on(PostActions.createPostFailure, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isCreateLoading: false
    },
    error: {
      responseError: action.error
    }
  })),

  on(PostActions.updatePost, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      isUpdateLoading: true
    },
  })),

  on(PostActions.updatePostSuccess, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isUpdateLoading: false
    },
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
    loading: {
      ...state.loading,
      isUpdateLoading: false
    },
    error: {
      responseError: action.error()
    },
    editor: {
      ...state.editor,
      isEditingMode: false,
      editedPost: null
    }
  })),

  on(PostActions.deletePost, (state) => ({
    ...state,
    loading: {
      ...state.loading,
      isDeleteLoading: true
    },
  })),

  on(PostActions.deletePostSuccess, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isDeleteLoading: false
    },
    selectedPost: state.selectedPost?.id === action.postId ? null : state.selectedPost,
    selectedBlogPosts: state.selectedBlogPosts.filter(p => p.id !== action.postId),
    editor: {
      ...state.editor,
      editedPost: state.editor.editedPost?.id === action.postId ? null : state.editor.editedPost
    }
  })),

  on(PostActions.deletePostFailure, (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      isDeleteLoading: false
    },
    error: {
      responseError: action.error
    }
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
