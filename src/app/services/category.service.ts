import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {
  }

  private publicationServiceUrl = `${environment.apiUrl}/publication-service`;

  createCategory(blogId: string, principal: string, categoryName: string): Observable<void> {
    const url = `${this.publicationServiceUrl}/${blogId},${principal}/categories`
    return this.httpClient.post<void>(url, { name : categoryName })
  }
}
