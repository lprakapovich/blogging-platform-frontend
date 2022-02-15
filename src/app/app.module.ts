import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/core/home/home.component';
import { AboutComponent } from './components/core/about/about.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { H2Component } from './components/blog/editor/editor-components/h2/h2.component';
import { H3Component } from './components/blog/editor/editor-components/h3/h3.component';
import { PlainTextComponent } from './components/blog/editor/editor-components/plain-text/plain-text.component';
import { NumberedComponent } from './components/blog/editor/editor-components/numbered/numbered.component';
import { BulletedComponent } from './components/blog/editor/editor-components/bulleted/bulleted.component';
import { BlogComponent } from './components/blog/blog/blog.component';
import { BlogPostComponent } from './components/blog/blog-post/blog-post.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { DefaultButtonComponent } from './components/ui-elements/default-button/default-button.component';
import { SearchBarComponent } from './components/ui-elements/search-bar/search-bar.component';
import { BlogPostPreviewComponent } from './components/blog/blog-post-preview/blog-post-preview.component';
import { EditorComponent } from './components/blog/editor/editor/editor.component';
import { EditorPageComponent } from './components/blog/editor/editor-page/editor-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconButtonComponent } from './components/ui-elements/plus-circle-button/icon-button.component';
import { DropDownMenuComponent } from './components/ui-elements/drop-down-menu/drop-down-menu.component';
import { SvgButtonComponent } from './components/ui-elements/svg-button/svg-button.component';
import { CircleButtonComponent } from './components/ui-elements/circle-button/circle-button.component';
import { AuthorDataComponent } from './components/blog/author-data/author-data.component';
import { BlogStatisticsDataComponent } from './components/blog/blog-statistics-data/blog-statistics-data.component';
import { BlogPostPreviewListComponent } from './components/blog/blog-post-preview-list/blog-post-preview-list.component';
import { ModalComponent } from './components/ui-elements/modal/modal.component';
import { DefaultListComponent } from './components/ui-elements/default-list/default-list.component';
import { BlogSettingsModalComponent } from './components/blog/blog-settings-modal/blog-settings-modal.component';
import { TextButtonComponent } from './components/ui-elements/text-button/text-button.component';
import { DefaultInputComponent } from './components/ui-elements/default-input/default-input.component';
import { DefaultSearchBarComponent } from './components/ui-elements/default-search-bar/default-search-bar.component';
import { ConfirmActionModalComponent } from './components/ui-elements/confirm-action-modal/confirm-action-modal.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { InformationModalComponent } from './components/ui-elements/information-modal/information-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    H2Component,
    H3Component,
    PlainTextComponent,
    NumberedComponent,
    BulletedComponent,
    BlogComponent,
    BlogPostComponent,
    DefaultButtonComponent,
    SearchBarComponent,
    BlogPostPreviewComponent,
    EditorComponent,
    EditorPageComponent,
    IconButtonComponent,
    DropDownMenuComponent,
    SvgButtonComponent,
    CircleButtonComponent,
    AuthorDataComponent,
    BlogStatisticsDataComponent,
    BlogPostPreviewListComponent,
    ModalComponent,
    DefaultListComponent,
    BlogSettingsModalComponent,
    TextButtonComponent,
    DefaultInputComponent,
    DefaultSearchBarComponent,
    ConfirmActionModalComponent,
    LoginComponent,
    SignupComponent,
    InformationModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [HttpClient, HttpClientModule],
  bootstrap: [AppComponent],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AppModule { }
