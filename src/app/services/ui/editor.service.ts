import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private publishEventChanged = new Subject<void>();
  private deleteEventChanged = new Subject<void>();

  onPublishPostClicked() {
    this.publishEventChanged.next();
  }

  onDeletePostClicked() {
    this.deleteEventChanged.next();
  }

  getPublishEventChanged() {
    return this.publishEventChanged;
  }

  getDeleteEventChanged() {
    return this.deleteEventChanged;
  }
}
