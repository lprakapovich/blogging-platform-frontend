import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {
  }

  private publicationServiceUrl = `${environment.apiUrl}/publication-service`;

  createCategory(blogId: string, principal: string, categoryName: string) {
    const url = `${this.publicationServiceUrl}/${blogId},${principal}/categories`
    return this.httpClient.post(url, { name : categoryName });
  }

  deleteCategory(blogId: string, principal: string, categoryId: number) {
    const url = `${this.publicationServiceUrl}/${blogId},${principal}/categories/${categoryId}`;
    return this.httpClient.delete(url);
  }
}
