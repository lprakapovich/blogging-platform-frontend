import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {CategoryService} from "../../services/category.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CategoryActionTypes, createCategoryFailure, createCategorySuccess} from "../actions/category.actions";
import {catchError, combineLatestWith, debounceTime, map, of, switchMap} from "rxjs";
import {selectAuthenticatedUserBlogId} from "../selectors/blog.selectors";

@Injectable({
  providedIn: 'root'
})
export class CategoryEffects {

  constructor(private store: Store,
              private actions$: Actions,
              private categoryService: CategoryService
              ) {
  }

  createCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActionTypes.CREATE_CATEGORY),
      debounceTime(500),
      map((action: any) => action.name),
      combineLatestWith(this.store.select(selectAuthenticatedUserBlogId)),
      switchMap(([categoryName, {id, username}]) => {
        return this.categoryService.createCategory(id, username, categoryName)
          .pipe(
            map((response: any) => {
              const createdCategoryId = response.headers.get('Location');
              return createCategorySuccess({
                category: {
                  id: createdCategoryId,
                  name: categoryName
                }
              })
            }),
            catchError((response) => of(createCategoryFailure({error: response.error?.message})))
          )
      })
    );
  })
}
