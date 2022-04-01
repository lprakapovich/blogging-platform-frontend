import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private showAppMenuModalChange: Subject<boolean> = new Subject<boolean>();
  private showAppSettingsModalChange: Subject<boolean> = new Subject<boolean>();

  showAppMenuModal(show: boolean) {
    console.log(`Show menu? ${show}`)
    this.showAppMenuModalChange.next(show);
  }

  showAppSettingsModal(show: boolean) {
    this.showAppSettingsModalChange.next(show)
  }

  getAppMenuModalSubject() {
    return this.showAppMenuModalChange;
  }

  getAppSettingsModalSubject() {
    return this.showAppSettingsModalChange;
  }
}
