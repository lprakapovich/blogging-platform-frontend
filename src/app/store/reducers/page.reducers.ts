import {createReducer, on} from "@ngrx/store";
import * as PageActions from '../actions/page.actions';

export interface PageState {
  currentPage: number;
}

export const initialState: PageState = {
  currentPage: 0
}

export const pageReducer = createReducer(
  initialState,

  on(PageActions.incrementPage, (state) => ({
    ...state,
    currentPage: state.currentPage + 1
  })),

  on(PageActions.decrementPage, (state) => ({
    ...state,
    currentPage: (state.currentPage !== 0) ? state.currentPage - 1 : state.currentPage
  })),

  on(PageActions.resetPage, (state) => ({
    ...state,
    currentPage: 0
  }))
)


