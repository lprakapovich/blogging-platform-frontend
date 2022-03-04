import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/core/home/home.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
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
import { DropDownMenuComponent } from './components/ui-elements/drop-down-menu/drop-down-menu.component';
import { SvgButtonComponent } from './components/ui-elements/svg-button/svg-button.component';
import { AuthorDataComponent } from './components/blog/author-data/author-data.component';
import { BlogStatisticsDataComponent } from './components/blog/blog-statistics-data/blog-statistics-data.component';
import { BlogPostPreviewListComponent } from './components/blog/blog-post-preview-list/blog-post-preview-list.component';
import { ModalComponent } from './components/ui-elements/modal/modal.component';
import { DefaultListComponent } from './components/ui-elements/default-list/default-list.component';
import { BlogSettingsModalComponent } from './components/blog/blog-settings-modal/blog-settings-modal.component';
import { TextButtonComponent } from './components/ui-elements/text-button/text-button.component';
import { DefaultInputComponent } from './components/ui-elements/default-input/default-input.component';
import { DefaultSearchBarComponent } from './components/ui-elements/default-search-bar/default-search-bar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { InformationModalComponent } from './components/ui-elements/information-modal/information-modal.component';
import { ClickOutsideDirective } from './directive/click-outside.directive';
import { FeedComponent } from './components/blog/feed/feed.component';
import { SearchResultComponent } from './components/blog/search-result/search-result.component';
import { AvatarComponent } from './components/ui-elements/avatar/avatar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BlogComponent,
    BlogPostComponent,
    DefaultButtonComponent,
    SearchBarComponent,
    BlogPostPreviewComponent,
    EditorComponent,
    EditorPageComponent,
    DropDownMenuComponent,
    SvgButtonComponent,
    AuthorDataComponent,
    BlogStatisticsDataComponent,
    BlogPostPreviewListComponent,
    ModalComponent,
    DefaultListComponent,
    BlogSettingsModalComponent,
    TextButtonComponent,
    DefaultInputComponent,
    DefaultSearchBarComponent,
    LoginComponent,
    SignupComponent,
    InformationModalComponent,
    ClickOutsideDirective,
    FeedComponent,
    SearchResultComponent,
    AvatarComponent,
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
