import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {BlogPost} from "../models/BlogPost";
import {MockService} from "./mock.service";

@Injectable({
  "providedIn": 'root'
})
export class PostService {

  constructor(private mock: MockService) {
  }

  getPostsByTitle(title: string): Observable<BlogPost[]>{
    return of(this.mock.getPosts());
  }

  getPostsFromSubscriptions(blogId: string) {
    return of(this.mock.getPostsFromSubscriptions())
  }
}
