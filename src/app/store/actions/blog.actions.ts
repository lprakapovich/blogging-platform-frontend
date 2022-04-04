import {createAction, props} from "@ngrx/store";
import {Blog} from "../../models/Blog";
import {BlogView} from "../../models/BlogView";
import {UpdateBlogData} from "../../models/data/blog/UpdateBlogData";

export enum BlogActionTypes {

  CREATE_BLOG = "[blog] create blog",
  CREATE_BLOG_SUCCESS = "[blog] create blog success",
  CREATE_BLOG_FAILURE = "[blog] create blog failure",

  UPDATE_BLOG = "[blog] update blog",
  UPDATE_BLOG_SUCCESS = "[blog] update blog success",
  UPDATE_BLOG_FAILURE = "[blog] update blog failure",

  GET_PRINCIPAL_BLOGS_AND_REDIRECT = "[blog] get principal managed blogs and redirect",
  GET_PRINCIPAL_BLOGS_AND_REDIRECT_SUCCESS = "[blog] get principal managed blogs and redirect success",

  GET_BLOG_DETAILS = "[blog] get blog details",
  GET_BLOG_DETAILS_SUCCESS = "[blog] get blog details success",
  GET_BLOG_DETAILS_FAILURE = "[blog] get blog details failure",

  GET_BLOG_DETAILS_AND_REDIRECT = "[blog] get blog details and redirect",
  GET_BLOG_DETAILS_AND_REDIRECT_SUCCESS = "[blog] get blog details and redirect success",

  GET_BLOGS_BY_SEARCH_CRITERIA = "[blog] get blogs by search criteria (display name or description)",
  GET_BLOGS_BY_SEARCH_CRITERIA_SUCCESS = "[blog] get blogs search criteria success",
}

export const getUserBlogsAndRedirect = createAction(BlogActionTypes.GET_PRINCIPAL_BLOGS_AND_REDIRECT, props<{path: string}>());
export const getUserBlogsAndRedirectSuccess = createAction(BlogActionTypes.GET_PRINCIPAL_BLOGS_AND_REDIRECT_SUCCESS, props<{blogs: BlogView[], path: string}>());

export const getBlogDetails = createAction(BlogActionTypes.GET_BLOG_DETAILS);
export const getBlogDetailsSuccess = createAction(BlogActionTypes.GET_BLOG_DETAILS_SUCCESS, props<{payload: any}>());
export const getBlogDetailsFailure = createAction(BlogActionTypes.GET_BLOG_DETAILS_FAILURE, props<{error: any}>());

export const getBlogDetailsAndRedirect = createAction(BlogActionTypes.GET_BLOG_DETAILS_AND_REDIRECT, props<{blogId: string, username: string}>())
export const getBlogDetailsAndRedirectSuccess = createAction(BlogActionTypes.GET_BLOG_DETAILS_AND_REDIRECT_SUCCESS, props<{blog: BlogView, blogId: string, isPrincipal: boolean}>())

export const getBlogsBySearchCriteria = createAction(BlogActionTypes.GET_BLOGS_BY_SEARCH_CRITERIA, props<{payload: string}>())
export const getBlogsBySearchCriteriaSuccess = createAction(BlogActionTypes.GET_BLOGS_BY_SEARCH_CRITERIA_SUCCESS, props<{blogs: Blog[]}>())

export const createBlog = createAction(BlogActionTypes.CREATE_BLOG, props<{blogId: string}>())
export const createBlogSuccess = createAction(BlogActionTypes.CREATE_BLOG_SUCCESS, props<{blogId: string, principal: string}>());
export const createBlogFailure = createAction(BlogActionTypes.CREATE_BLOG_FAILURE, props<{error: any}>())

export const updateBlog = createAction(BlogActionTypes.UPDATE_BLOG, props<{data: UpdateBlogData}>())
export const updateBlogSuccess = createAction(BlogActionTypes.UPDATE_BLOG_SUCCESS, props<{updatedBlog: BlogView}>())
export const updateBlogFailure = createAction(BlogActionTypes.UPDATE_BLOG_FAILURE)
