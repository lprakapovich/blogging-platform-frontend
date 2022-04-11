import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {SubscriptionService} from "../../services/api/subscription.service";
import {Injectable} from "@angular/core";
import {
  createSubscriptionFailure,
  createSubscriptionSuccess,
  deleteSubscriptionFailure,
  deleteSubscriptionSuccess,
  SubscriptionActionTypes
} from "../actions/subscription.actions";
import {catchError, combineLatestWith, map, of, switchMap} from "rxjs";
import {selectAuthenticatedUserBlogId} from "../selectors/blog.selectors";
import {Subscription} from "../../models/Subscription";

@Injectable()
export class SubscriptionEffects {

  constructor(private store: Store,
              private actions$: Actions,
              private subscriptionService: SubscriptionService) {
  }

  createSubscription = createEffect(() =>
  this.actions$.pipe(
    ofType(SubscriptionActionTypes.CREATE_SUBSCRIPTION),
    map((action: any) => action.blogId),
    combineLatestWith(this.store.select(selectAuthenticatedUserBlogId)),
    switchMap(([subscriptionBlogId, {id, username}]) => {
      return this.subscriptionService.addSubscription(id, username, subscriptionBlogId)
        .pipe(
          map(() => {
            const subscription: Subscription = {
              id: {
                subscriber: { id, username },
                subscription: subscriptionBlogId
              }
            }
            return createSubscriptionSuccess({subscription}) }
          ),
          catchError((error) => of(createSubscriptionFailure({error})))
        )
    })
  ))

  deleteSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscriptionActionTypes.DELETE_SUBSCRIPTION),
      map((action: any) => action.blogId),
      combineLatestWith(this.store.select(selectAuthenticatedUserBlogId)),
      switchMap(([unsubscribedBlogId, {id, username}]) => {
        return this.subscriptionService.deleteSubscription(id, username, unsubscribedBlogId)
          .pipe(
            map(() => {
              return deleteSubscriptionSuccess({ unsubscribedBlogId })
            }),
            catchError((error) => of(deleteSubscriptionFailure({error})))
          )
      })
    )
  )
}

