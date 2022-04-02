import {createAction, props} from "@ngrx/store";
import {Blog} from "../../models/Blog";
import {BlogView} from "../../models/BlogView";
import {UpdateBlogData} from "../../models/data/blog/UpdateBlogData";

export enum BlogActionTypes {

  CREATE_BLOG = "[Blog] Create blog",
  CREATE_BLOG_SUCCESS = "[Blog] Create blog success",
  CREATE_BLOG_FAILURE = "[Blog] Create blog failure",

  UPDATE_BLOG = "[Blog] Update blog",
  UPDATE_BLOG_SUCCESS = "[Blog] Update blog success",
  UPDATE_BLOG_FAILURE = "[Blog] Update blog failure",

  GET_USER_BLOGS_AND_REDIRECT = "[Blog] Get all user blogs and redirect",
  GET_USER_BLOGS_AND_REDIRECT_SUCCESS = "[Blog] Get all user blogs success and redirect",

  GET_BLOG_DETAILS = "[Blog] Get blog details",
  GET_BLOG_DETAILS_SUCCESS = "[Blog] Get blog details success",
  GET_BLOG_DETAILS_FAILURE = "[Blog] Get blog details failure",

  GET_BLOG_DETAILS_AND_REDIRECT = "[Blog] Get blog details and redirect",
  GET_BLOG_DETAILS_AND_REDIRECT_SUCCESS = "[Blog] Get blog details and redirect success",

  GET_BLOGS_BY_SEARCH_CRITERIA = "[Blog] Get blogs by display name or description",
  GET_BLOGS_BY_SEARCH_CRITERIA_SUCCESS = "[Blog] Get blogs by display name or description success",

  SET_SELECTED_BLOG_ID = "[Blog] Set selected blog id",
  SET_AUTHENTICATED_USER_BLOG_ID = "[Blog] Set authenticated user blog id",

  SET_USER_BLOG_IDS = "[BLOG] Set user blog ids",
  SET_USER_BLOGS_AND_REDIRECT = "[Blog] Set user blogs and redirect"
}

export const setUserBlogsIds = createAction(BlogActionTypes.SET_USER_BLOG_IDS, props<{blogIds: string[]}>())

export const getUserBlogsAndRedirect = createAction(BlogActionTypes.GET_USER_BLOGS_AND_REDIRECT, props<{path: string}>());
export const getUserBlogsAndRedirectSuccess = createAction(BlogActionTypes.GET_USER_BLOGS_AND_REDIRECT_SUCCESS, props<{blogs: BlogView[], path: string}>());

export const getBlogDetails = createAction(BlogActionTypes.GET_BLOG_DETAILS);
export const getBlogDetailsSuccess = createAction(BlogActionTypes.GET_BLOG_DETAILS_SUCCESS, props<{payload: any}>());
export const getBlogDetailsFailure = createAction(BlogActionTypes.GET_BLOG_DETAILS_FAILURE, props<{error: any}>());

export const getBlogDetailsAndRedirect = createAction(BlogActionTypes.GET_BLOG_DETAILS_AND_REDIRECT, props<{blogId: string}>())
export const getBlogDetailsAndRedirectSuccess = createAction(BlogActionTypes.GET_BLOG_DETAILS_AND_REDIRECT_SUCCESS, props<{blog: BlogView, blogId: string}>())

export const getBlogsBySearchCriteria = createAction(BlogActionTypes.GET_BLOGS_BY_SEARCH_CRITERIA, props<{payload: string}>())
export const getBlogsBySearchCriteriaSuccess = createAction(BlogActionTypes.GET_BLOGS_BY_SEARCH_CRITERIA_SUCCESS, props<{blogs: Blog[]}>())

export const setSelectedBlogId = createAction(BlogActionTypes.SET_SELECTED_BLOG_ID, props<{blogId: string}>());
export const setBlogIdAndRedirect = createAction(BlogActionTypes.SET_AUTHENTICATED_USER_BLOG_ID, props<{blogId: string}>())

export const createBlog = createAction(BlogActionTypes.CREATE_BLOG, props<{blogId: string}>())
export const createBlogSuccess = createAction(BlogActionTypes.CREATE_BLOG_SUCCESS, props<{blogId: string}>());
export const createBlogFailure = createAction(BlogActionTypes.CREATE_BLOG_FAILURE, props<{error: any}>())

export const updateBlog = createAction(BlogActionTypes.UPDATE_BLOG, props<{data: UpdateBlogData}>())
export const updateBlogSuccess = createAction(BlogActionTypes.UPDATE_BLOG_SUCCESS, props<{updatedBlog: BlogView}>())
export const updateBlogFailure = createAction(BlogActionTypes.UPDATE_BLOG_FAILURE)
