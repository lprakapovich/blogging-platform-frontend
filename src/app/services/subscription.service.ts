import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {BlogId} from "../models/Blog";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private publicationServiceUrl = `${environment.apiUrl}/publication-service`;

  constructor(private httpClient: HttpClient) {
  }

  addSubscription(blogId: string, principal: string, subscriptionBlogId: BlogId) {
    const subscriptionDto = {
      subscription: {
        id: subscriptionBlogId.id,
        username: subscriptionBlogId.username
      }
    }
    const url = `${this.publicationServiceUrl}/${blogId},${principal}/subscriptions`
    return this.httpClient.post(url, subscriptionDto);
  }

  deleteSubscription(blogId: string, principal: string, subscriptionBlogId: BlogId) {
    const url = `${this.publicationServiceUrl}/${blogId},${principal}/subscriptions/${subscriptionBlogId.id},${subscriptionBlogId.username}`
    return this.httpClient.delete(url)
  }
}
