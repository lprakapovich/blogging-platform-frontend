import {Injectable} from "@angular/core";
import {Blog, BlogId} from "../models/Blog";
import {Observable, of} from "rxjs";
import {MockService} from "./mock.service";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CreateBlogData} from "../models/data/blog/CreateBlogData";
import {UpdateBlogData} from "../models/data/blog/UpdateBlogData";

@Injectable({
  "providedIn": 'root'
})
export class BlogService {

  private publicationServiceUrl = `${environment.apiUrl}/publication-service`;

  constructor(private mock: MockService,
              private httpClient: HttpClient) {
  }

  createBlog(blogId: string): Observable<void> {
    const url = `${this.publicationServiceUrl}/blogs`;
    const body: CreateBlogData = {
      id: blogId
    };
    return this.httpClient.post<void>(url, body);
  }

  updateBlog(blogId: string, principal: string, updateData: UpdateBlogData): Observable<Blog> {
    const url = `${this.publicationServiceUrl}/blogs/${blogId},${principal}`;
    return this.httpClient.put<Blog>(url, updateData);
  }

  deleteBlog(blogId: string, principal: string): Observable<void> {
    const url = `${this.publicationServiceUrl}/blogs/${blogId},${principal}`;
    return this.httpClient.delete<void>(url);
  }

  getAuthenticatedUserBlogIds(): Observable<BlogId[]> {
    const url = `${this.publicationServiceUrl}/blogs/owned`
    return this.httpClient.get<BlogId[]>(url);
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
