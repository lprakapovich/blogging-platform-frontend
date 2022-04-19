import {createAction} from "@ngrx/store";

export enum PageActionTypes {

  INCREMENT_PAGE = '[page] increment page',
  DECREMENT_PAGE = '[page] decrement page',
  RESET_PAGE = '[page] reset page'
}

export const incrementPage = createAction(PageActionTypes.INCREMENT_PAGE);
export const decrementPage = createAction(PageActionTypes.DECREMENT_PAGE);
export const resetPage = createAction(PageActionTypes.RESET_PAGE);
