import {createAction, props} from "@ngrx/store";
import {Blog} from "../../models/Blog";

export enum BlogActionTypes {

  CREATE_BLOG = "[Blog] Create blog",
  UPDATE_BLOG = "[Blog] Update blog",
  DELETE_BLOG = "[Blog] Delete blog",

  GET_BLOG_DETAILS = "[Blog] Get blog details",
  GET_BLOG_DETAILS_SUCCESS = "[Blog] Get blog details success",
  GET_BLOG_DETAILS_FAILURE = "[Blog] Get blog details failure",

  GET_BLOGS_BY_SEARCH_CRITERIA = "[Blog] Get blogs by display name or description",
  GET_BLOGS_BY_SEARCH_CRITERIA_SUCCESS = "[Blog] Get blogs by display name or description success",

  SET_SELECTED_BLOG_ID = "[Blog] Set selected blog id"
}

export const getBlogDetails = createAction(BlogActionTypes.GET_BLOG_DETAILS);

export const getBlogDetailsSuccess = createAction(BlogActionTypes.GET_BLOG_DETAILS_SUCCESS, props<{payload: any}>());

export const getBlogDetailsFailure = createAction(BlogActionTypes.GET_BLOG_DETAILS_FAILURE, props<{error: any}>());

export const getBlogsBySearchCriteria = createAction(BlogActionTypes.GET_BLOGS_BY_SEARCH_CRITERIA, props<{payload: string}>())

export const getBlogsBySearchCriteriaSuccess = createAction(BlogActionTypes.GET_BLOGS_BY_SEARCH_CRITERIA_SUCCESS, props<{blogs: Blog[]}>())

export const setSelectedBlogId = createAction(BlogActionTypes.SET_SELECTED_BLOG_ID, props<{blogId: string}>());

