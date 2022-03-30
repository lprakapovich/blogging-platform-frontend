import {Injectable} from "@angular/core";
import {Blog} from "../models/Blog";
import {Observable, of} from "rxjs";
import {MockService} from "./mock.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  "providedIn": 'root'
})
export class BlogService {

  private publicationServiceUrl = `${environment.apiUrl}/publication-service`;

  constructor(private mock: MockService,
              private httpClient: HttpClient) {
  }

  createBlog(blogId: string): Observable<any> {
    const url = `${this.publicationServiceUrl}/blogs`;
    return this.httpClient.post(url, {
      id: blogId
    })
  }

  getLastVisitedBlog(): Observable<Blog> {
    const blog: Blog = {
      id: 'lprakapovich',
      name: 'Lizaveta Prakapovich',
      description: "This is by fokeng blog!!",
      publications: []
    }
    return of(blog);
  }

  getBySearchCriteria(searchCriteria: string): Observable<Blog[]> {
    return of(this.mock.getBlogs());
  }

  getAllUserBlogIds(): Observable<string[]> {
    return of(this.mock.getAllUserBlogIds())
  }
}
