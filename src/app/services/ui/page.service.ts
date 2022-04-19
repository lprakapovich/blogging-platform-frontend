import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {decrementPage, incrementPage} from "src/app/store/actions/page.actions";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private readonly currentPageChanged;

  constructor(private store: Store) {
    this.currentPageChanged = new Subject<void>();
  }

  incrementPage() {
    this.store.dispatch(incrementPage())
    this.currentPageChanged.next();
  }

  decrementPage() {
    this.store.dispatch(decrementPage())
    this.currentPageChanged.next();
  }

  getCurrentPageChanged() {
    return this.currentPageChanged;
  }
}
