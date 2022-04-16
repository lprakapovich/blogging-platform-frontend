import {createAction, props} from "@ngrx/store";
import {Blog, BlogId} from "../../models/Blog";
import {BlogView} from "../../models/BlogView";
import {UpdateBlogData} from "../../models/data/blog/UpdateBlogData";

export enum BlogActionTypes {

  CREATE_BLOG = "[blog] create blog",
  CREATE_BLOG_SUCCESS = "[blog] create blog success",
  CREATE_BLOG_FAILURE = "[blog] create blog failure",

  UPDATE_BLOG = "[blog] update blog",
  UPDATE_BLOG_SUCCESS = "[blog] update blog success",
  UPDATE_BLOG_FAILURE = "[blog] update blog failure",

  DELETE_BLOG = "[blog] delete blog",
  DELETE_BLOG_SUCCESS = "[blog] delete blog success",
  DELETE_BLOG_FAILURE = "[blog] delete blog failure",

  GET_PRINCIPAL_BLOGS_AND_REDIRECT = "[blog] get principal blogs and redirect",
  GET_PRINCIPAL_BLOGS_AND_REDIRECT_SUCCESS = "[blog] get principal blogs and redirect success",
  GET_PRINCIPAL_BLOGS_AND_REDIRECT_FAILURE = "[blog] get principal blogs and redirect failure",

  GET_BLOG_DETAILS_AND_REDIRECT = "[blog] get blog details and redirect",
  GET_BLOG_DETAILS_AND_REDIRECT_SUCCESS = "[blog] get blog details and redirect success",
  GET_BLOG_DETAILS_AND_REDIRECT_FAILURE = "[blog] get blog details and redirect failure",

  GET_BLOG_DETAILS = "[blog] get blog details",
  GET_BLOG_DETAILS_SUCCESS = "[blog] get blog details success",
  GET_BLOG_DETAILS_FAILURE = "[blog] get blog details failure",

  GET_SEARCHED_BLOGS = "[blog] get blogs by search criteria",
  GET_SEARCHED_BLOGS_SUCCESS = "[blog] get blogs search criteria success",
  GET_SEARCHED_BLOGS_FAILURE = "[blog] get blogs search criteria failure",
}

export const getPrincipalBlogsAndRedirect = createAction(BlogActionTypes.GET_PRINCIPAL_BLOGS_AND_REDIRECT, props<{path: string}>());
export const getPrincipalBlogsAndRedirectSuccess = createAction(BlogActionTypes.GET_PRINCIPAL_BLOGS_AND_REDIRECT_SUCCESS, props<{blogs: BlogView[], path: string}>());
export const getPrincipalBlogsAndRedirectFailure = createAction(BlogActionTypes.GET_PRINCIPAL_BLOGS_AND_REDIRECT_FAILURE, props<{error: any}>());

export const getBlogDetailsAndRedirect = createAction(BlogActionTypes.GET_BLOG_DETAILS_AND_REDIRECT, props<{blogId: BlogId}>())
export const getBlogDetailsAndRedirectSuccess = createAction(BlogActionTypes.GET_BLOG_DETAILS_AND_REDIRECT_SUCCESS, props<{blog: BlogView, blogId: string, isPrincipal: boolean}>())
export const getBlogDetailsAndRedirectFailure = createAction(BlogActionTypes.GET_BLOG_DETAILS_AND_REDIRECT_FAILURE, props<{error: any}>())

export const getBlogDetails = createAction(BlogActionTypes.GET_BLOG_DETAILS, props<{blogId: BlogId}>())
export const getBlogDetailsSuccess = createAction(BlogActionTypes.GET_BLOG_DETAILS_SUCCESS, props<{blog: BlogView, blogId: string, isPrincipal: boolean}>())
export const getBlogDetailsFailure = createAction(BlogActionTypes.GET_BLOG_DETAILS_FAILURE, props<{error: any}>())

export const getSearchedBlogs = createAction(BlogActionTypes.GET_SEARCHED_BLOGS, props<{searchCriteria: string}>())
export const getSearchedBlogsSuccess = createAction(BlogActionTypes.GET_SEARCHED_BLOGS_SUCCESS, props<{blogs: Blog[]}>())
export const getSearchedBlogsFailure = createAction(BlogActionTypes.GET_SEARCHED_BLOGS_FAILURE, props<{error: any}>())

export const createBlog = createAction(BlogActionTypes.CREATE_BLOG, props<{blogId: string, redirectTo?: string}>())
export const createBlogSuccess = createAction(BlogActionTypes.CREATE_BLOG_SUCCESS, props<{blogId: string, principal: string, redirectTo?: string}>());
export const createBlogFailure = createAction(BlogActionTypes.CREATE_BLOG_FAILURE, props<{error: any}>())

export const updateBlog = createAction(BlogActionTypes.UPDATE_BLOG, props<{data: UpdateBlogData}>())
export const updateBlogSuccess = createAction(BlogActionTypes.UPDATE_BLOG_SUCCESS, props<{updatedBlog: BlogView}>())
export const updateBlogFailure = createAction(BlogActionTypes.UPDATE_BLOG_FAILURE, props<{error: any}>())

export const deleteBlog = createAction(BlogActionTypes.DELETE_BLOG)
export const deleteBlogSuccess = createAction(BlogActionTypes.DELETE_BLOG_SUCCESS, props<{blogId: BlogId}>())
export const deleteBlogFailure = createAction(BlogActionTypes.DELETE_BLOG_FAILURE, props<{error: any}>())
