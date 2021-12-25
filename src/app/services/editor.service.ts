import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor() { }

  releaseInput(inputId: string) {
    let inputToRelease = document.getElementById(inputId);
    if (inputToRelease) {
      inputToRelease.blur();
    }
  }
}
