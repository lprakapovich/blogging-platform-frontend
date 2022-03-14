import {createAction, props} from "@ngrx/store";
import {Blog} from "../../models/Blog";
import {BlogCreationData} from "../../models/data/BlogCreationData";

export enum BlogActionTypes {

  CREATE_BLOG = "[Blog] Create blog",
  CREATE_BLOG_SUCCESS = "[Blog] Create blog success",
  CREATE_BLOG_FAILURE = "[Blog] Create blog failure",

  UPDATE_BLOG = "[Blog] Update blog",
  UPDATE_BLOG_SUCCESS = "[Blog] Update blog success",
  UPDATE_BLOG_FAILURE = "[Blog] Update blog failure",

  DELETE_BLOG = "[Blog] Delete blog",
  DELETE_BLOG_SUCCESS = "[Blog] Delete blog",
  DELETE_BLOG_FAILURE = "[Blog] Delete blog",

  GET_USER_BLOGS_IDS = "[Blog] Get all user blogs ids",
  GET_USER_BLOGS_IDS_SUCCESS = "[Blog] Get all user blogs ids success",

  GET_BLOG_DETAILS = "[Blog] Get blog details",
  GET_BLOG_DETAILS_SUCCESS = "[Blog] Get blog details success",
  GET_BLOG_DETAILS_FAILURE = "[Blog] Get blog details failure",

  GET_BLOGS_BY_SEARCH_CRITERIA = "[Blog] Get blogs by display name or description",
  GET_BLOGS_BY_SEARCH_CRITERIA_SUCCESS = "[Blog] Get blogs by display name or description success",

  SET_SELECTED_BLOG_ID = "[Blog] Set selected blog id"
}

export const getUserBlogsIds = createAction(BlogActionTypes.GET_USER_BLOGS_IDS);

export const getUserBlogsIdsSuccess = createAction(BlogActionTypes.GET_USER_BLOGS_IDS_SUCCESS, props<{blogIds: string[]}>());

export const getBlogDetails = createAction(BlogActionTypes.GET_BLOG_DETAILS);

export const getBlogDetailsSuccess = createAction(BlogActionTypes.GET_BLOG_DETAILS_SUCCESS, props<{payload: any}>());

export const getBlogDetailsFailure = createAction(BlogActionTypes.GET_BLOG_DETAILS_FAILURE, props<{error: any}>());

export const getBlogsBySearchCriteria = createAction(BlogActionTypes.GET_BLOGS_BY_SEARCH_CRITERIA, props<{payload: string}>())

export const getBlogsBySearchCriteriaSuccess = createAction(BlogActionTypes.GET_BLOGS_BY_SEARCH_CRITERIA_SUCCESS, props<{blogs: Blog[]}>())

export const setSelectedBlogId = createAction(BlogActionTypes.SET_SELECTED_BLOG_ID, props<{blogId: string}>());

export const createBlog = createAction(BlogActionTypes.CREATE_BLOG, props<{data: BlogCreationData}>())

export const createBlogSuccess = createAction(BlogActionTypes.CREATE_BLOG_SUCCESS, props<{createdBlogId: string}>())

export const createBlogFailure = createAction(BlogActionTypes.CREATE_BLOG_FAILURE, props<{error: any}>())
