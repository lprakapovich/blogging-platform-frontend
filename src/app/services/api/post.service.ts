import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {BlogPost} from "../../models/BlogPost";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CreatePostData} from "../../models/data/post/CreatePostData";
import {UpdatePostData} from "../../models/data/post/UpdatePostData";

@Injectable({
  "providedIn": 'root'
})
export class PostService {

  private publicationServiceUrl = `${environment.apiUrl}/publication-service`;

  constructor(private httpClient: HttpClient) {
  }

  createPost(blogId: string, principal: string, body: CreatePostData): Observable<BlogPost> {
    const url = `${this.publicationServiceUrl}/${blogId},${principal}/publications`
    return this.httpClient.post<BlogPost>(url, body)
  }

  updatePost(blogId: string, principal: string, postId: number, updatePostData: UpdatePostData) {
    const url = `${this.publicationServiceUrl}/${blogId},${principal}/publications/${postId}`
    return this.httpClient.put<BlogPost>(url, updatePostData)
  }

  deletePost(blogId: string, principal: string, postId: number) {
    const url = `${this.publicationServiceUrl}/${blogId},${principal}/publications/${postId}`
    return this.httpClient.delete(url)
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
    return this.httpClient.get<BlogPost[]>(url, { params })
  }

  getPostsFromSubscriptions(blogId: string, principal: string): Observable<any> {
    const url = `${this.publicationServiceUrl}/${blogId},${principal}/publications/subscriptions`
    return this.httpClient.get(url)
  }
}
