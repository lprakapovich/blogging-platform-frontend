import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {BlogPost} from "../models/BlogPost";
import {MockService} from "./mock.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  "providedIn": 'root'
})
export class PostService {

  private publicationServiceUrl = `${environment.apiUrl}/publication-service`;

  constructor(private mock: MockService,
              private httpClient: HttpClient) {
  }

  getPostsByTitle(title: string): Observable<BlogPost[]>{
    return of(this.mock.getPosts());
  }

  getPostsFromSubscriptions(blogId: string, principal: string): Observable<any> {
    const url = `${this.publicationServiceUrl}/${blogId},${principal}/publications/subscriptions`
    return this.httpClient.get(url)
  }
}
