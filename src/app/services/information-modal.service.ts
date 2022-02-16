import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {InformationModalComponent} from "../components/ui-elements/information-modal/information-modal.component";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InformationModalService {

  private componentRef!: ComponentRef<InformationModalComponent>;
  private componentSubscriber!: Subject<string>;

  constructor(private resolver: ComponentFactoryResolver) { }

  openModal(entry: ViewContainerRef, modalBody: string) {
    // let factory = this.resolver.resolveComponentFactory(InformationModalComponent);
    // this.componentRef = entry.createComponent(factory);
    // this.componentRef.instance.body = modalBody;
    // this.componentRef.instance.closeEvent.subscribe(() => this.closeModal());
    // this.componentRef.instance.clickEvent.subscribe(() => this.closeModal());
    // this.componentSubscriber = new Subject<string>();
    // return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }
}
