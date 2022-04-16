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
import {catchError, exhaustMap, map, of, withLatestFrom} from "rxjs";
import {selectPrincipalActiveBlogId} from "../selectors/blog.selectors";
import {Subscription} from "../../models/Subscription";
import * as fromSubscription from '../reducers/subscription.reducers'

@Injectable()
export class SubscriptionEffects {

  constructor(private store: Store<fromSubscription.SubscriptionState>,
              private actions$: Actions,
              private subscriptionService: SubscriptionService) {
  }

  createSubscription = createEffect(() =>
  this.actions$.pipe(
    ofType(SubscriptionActionTypes.CREATE_SUBSCRIPTION),
    withLatestFrom(this.store.select(selectPrincipalActiveBlogId)),
    exhaustMap(([{ blogId }, {id, username}]) => {
      return this.subscriptionService.addSubscription(id, username, blogId)
        .pipe(
          map(() => {
            const subscription: Subscription = {
              id: {
                subscriber: { id, username },
                subscription: blogId
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
      withLatestFrom(this.store.select(selectPrincipalActiveBlogId)),
      exhaustMap(([{blogId}, {id, username}]) => {
        return this.subscriptionService.deleteSubscription(id, username, blogId)
          .pipe(
            map(() => deleteSubscriptionSuccess({ unsubscribedBlogId: blogId })),
            catchError((error) => of(deleteSubscriptionFailure({error})))
          )
      })
    )
  )
}

