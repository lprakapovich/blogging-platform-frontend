import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {BlogPost} from "../models/BlogPost";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  "providedIn": 'root'
})
export class PostService {

  private publicationServiceUrl = `${environment.apiUrl}/publication-service`;

  constructor(private httpClient: HttpClient) {
  }

  getPosts(blogId: string, principal: string, status?: string, categoryId?: string) {
    const url = `${this.publicationServiceUrl}/${blogId},${principal}/publications`;
    const params = new HttpParams()
      .set('status', status ?? '')
      .set('categoryId', categoryId ?? '');
    return this.httpClient.get<BlogPost[]>(url, { params })
  }

  getPostsBySearchCriteria(criteria: string, blogId: string, principal: string): Observable<BlogPost[]>{
    const url = `${this.publicationServiceUrl}/${blogId},${principal}/publications/search`
    const params = new HttpParams().set('criteria', criteria);
    return this.httpClient.get<BlogPost[]>(url, { params: params})
  }

  getPostsFromSubscriptions(blogId: string, principal: string): Observable<any> {
    const url = `${this.publicationServiceUrl}/${blogId},${principal}/publications/subscriptions`
    return this.httpClient.get(url)
  }
}
