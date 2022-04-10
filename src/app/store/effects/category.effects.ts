import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {CategoryService} from "../../services/api/category.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  CategoryActionTypes,
  createCategoryFailure,
  createCategorySuccess,
  deleteCategoryFailure,
  deleteCategorySuccess
} from "../actions/category.actions";
import {catchError, combineLatestWith, debounceTime, map, of, switchMap} from "rxjs";
import {selectAuthenticatedUserBlogId} from "../selectors/blog.selectors";

@Injectable()
export class CategoryEffects {

  constructor(private store: Store,
              private actions$: Actions,
              private categoryService: CategoryService
              ) {
  }

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActionTypes.CREATE_CATEGORY),
      debounceTime(500),
      map((action: any) => action.name),
      combineLatestWith(this.store.select(selectAuthenticatedUserBlogId)),
      switchMap(([categoryName, {id, username}]) => {
        return this.categoryService.createCategory(id, username, categoryName)
          .pipe(
            map((categoryId: any) => {
              return createCategorySuccess({
                category: {
                  id: categoryId,
                  name: categoryName
                }
              })
            }),
            catchError((response) => of(createCategoryFailure({error: response.error?.message})))
          )
      })
    )
  )

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActionTypes.DELETE_CATEGORY),
      map((action: any) => action.id),
      combineLatestWith(this.store.select(selectAuthenticatedUserBlogId)),
      switchMap(([categoryId, {id, username}]) => {
        return this.categoryService.deleteCategory(id, username, categoryId)
          .pipe(
            map(() => deleteCategorySuccess({categoryId})),
            catchError(error => of(deleteCategoryFailure({ error })))
          )
      })
    )
  )
}
