import {Injectable} from "@angular/core";
import {Blog} from "../models/Blog";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CreateBlogData} from "../models/data/blog/CreateBlogData";
import {UpdateBlogData} from "../models/data/blog/UpdateBlogData";
import {BlogView} from "../models/BlogView";

@Injectable({
  "providedIn": 'root'
})
export class BlogService {

  private publicationServiceUrl = `${environment.apiUrl}/publication-service`;

  constructor(private httpClient: HttpClient) {
  }

  createBlog(blogId: string): Observable<void> {
    const url = `${this.publicationServiceUrl}/blogs`;
    const body: CreateBlogData = {
      id: blogId
    };
    return this.httpClient.post<void>(url, body);
  }

  updateBlog(blogId: string, principal: string, updateData: UpdateBlogData): Observable<BlogView> {
    const url = `${this.publicationServiceUrl}/blogs/${blogId},${principal}`;
    return this.httpClient.put<BlogView>(url, updateData);
  }

  deleteBlog(blogId: string, principal: string): Observable<void> {
    const url = `${this.publicationServiceUrl}/blogs/${blogId},${principal}`;
    return this.httpClient.delete<void>(url);
  }

  getUserManagedBlogs(): Observable<BlogView[]> {
    const url = `${this.publicationServiceUrl}/blogs/owned`
    return this.httpClient.get<BlogView[]>(url)
  }

  getBlogDetails(blogId: string, principal: string): Observable<BlogView> {
    const url = `${this.publicationServiceUrl}/blogs/${blogId},${principal}`;
    return this.httpClient.get<BlogView>(url);
  }

  getLastVisitedBlog(): Observable<any> {
    return of();
  }

  getBySearchCriteria(criteria: string): Observable<Blog[]> {
    const url = `${this.publicationServiceUrl}/blogs/search`
    const params = new HttpParams().set("criteria", criteria);
    return this.httpClient.get<Blog[]>(url, {
      params
    })
  }
}
