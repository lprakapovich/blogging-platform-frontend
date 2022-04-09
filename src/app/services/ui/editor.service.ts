import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private publishEventChanged = new Subject<void>();
  private deleteEventChanged = new Subject<void>();

  private missingContentOrTitleErrorChanged = new Subject<{
    isContentMissing: boolean,
    isTitleMissing: boolean
  }>();

  onPublishPostClicked() {
    this.publishEventChanged.next();
  }

  onDeletePostClicked() {
    this.deleteEventChanged.next();
  }

  onMissingContentOrTitleErrorChanged(isContentMissing: boolean, isTitleMissing: boolean) {
    this.missingContentOrTitleErrorChanged.next({ isContentMissing, isTitleMissing })
  }

  getPublishEventChanged() {
    return this.publishEventChanged;
  }

  getDeleteEventChanged() {
    return this.deleteEventChanged;
  }

  getMissingContentOrTitleErrorChanged() {
    return this.missingContentOrTitleErrorChanged;
  }
}
