import {Injectable} from "@angular/core";
import {Blog} from "../models/Blog";
import {Observable, of} from "rxjs";
import {MockService} from "./mock.service";

@Injectable({
  "providedIn": 'root'
})
export class BlogService {

  constructor(private mock: MockService) {
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
}
