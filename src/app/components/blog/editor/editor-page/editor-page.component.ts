import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavbarTemplateService} from "../../../../services/ui/navbar-template.service";
import {EditorService} from "../../../../services/ui/editor.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  isContentMissing: boolean;
  isTitleMissing: boolean;

  constructor(
    private navbarTemplateService: NavbarTemplateService,
    private editorService: EditorService) {
    this.navbarTemplateService.setEditorTemplate();
  }

  ngOnInit() {

    this.editorService.getMissingContentOrTitleErrorChanged()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({isContentMissing, isTitleMissing}) => {
        this.isContentMissing = isContentMissing;
        this.isTitleMissing = isTitleMissing;
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
