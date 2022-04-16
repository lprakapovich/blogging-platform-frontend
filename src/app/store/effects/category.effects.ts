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
import {catchError, debounceTime, exhaustMap, map, of, withLatestFrom} from "rxjs";
import {selectPrincipalActiveBlogId} from "../selectors/blog.selectors";
import * as fromCategory from '../reducers/category.reducers'

@Injectable()
export class CategoryEffects {

  constructor(private store: Store<fromCategory.CategoryState>,
              private actions$: Actions,
              private categoryService: CategoryService) {
  }

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActionTypes.CREATE_CATEGORY),
      debounceTime(1000),
      withLatestFrom(this.store.select(selectPrincipalActiveBlogId)),
      exhaustMap(([{name}, {id, username}]) => {
        return this.categoryService.createCategory(id, username, name)
          .pipe(
            map((id: any) => createCategorySuccess({ category: { id, name} })),
            catchError((response) => of(createCategoryFailure({error: response.error?.message})))
          )
      })
    )
  )

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActionTypes.DELETE_CATEGORY),
      map((action: any) => action.id),
      withLatestFrom(this.store.select(selectPrincipalActiveBlogId)),
      exhaustMap(([categoryId, {id, username}]) => {
        return this.categoryService.deleteCategory(id, username, categoryId)
          .pipe(
            map(() => deleteCategorySuccess({categoryId})),
            catchError(error => of(deleteCategoryFailure({ error })))
          )
      })
    )
  )
}
