import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navigation/navbar/navbar.component';
import {BlogPageComponent} from './components/blog/page/blog-page/blog-page.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {DefaultButtonComponent} from './components/ui-elements/default-button/default-button.component';
import {SearchBarComponent} from './components/ui-elements/search-bar/search-bar.component';
import {BlogPostPreviewListItemComponent} from './components/blog/blog-post/blog-post-preview-list-item/blog-post-preview-list-item.component';
import {EditorComponent} from './components/blog/editor/editor.component';
import {EditorPageComponent} from './components/blog/page/editor-page/editor-page.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SvgButtonComponent} from './components/ui-elements/svg-button/svg-button.component';
import {AuthorDataComponent} from './components/blog/blog/author-data/author-data.component';
import {BlogStatisticsDataComponent} from './components/blog/blog/blog-statistics-data/blog-statistics-data.component';
import {BlogPostPreviewListComponent} from './components/blog/blog-post/blog-post-preview-list/blog-post-preview-list.component';
import {DefaultListComponent} from './components/ui-elements/default-list/default-list.component';
import {BlogSettingsModalComponent} from './components/blog/blog/blog-settings-modal/blog-settings-modal.component';
import {TextButtonComponent} from './components/ui-elements/text-button/text-button.component';
import {DefaultInputComponent} from './components/ui-elements/default-input/default-input.component';
import {LoginComponent} from './components/auth/login/login.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import {AppMenuModalComponent} from './components/navigation/app-menu-modal/app-menu-modal.component';
import {FeedPageComponent} from './components/blog/page/feed-page/feed-page.component';
import {SearchPageComponent} from './components/blog/page/search-page/search-page.component';
import {AvatarComponent} from './components/ui-elements/avatar/avatar.component';
import {IconComponent} from './components/ui-elements/icon/icon.component';
import {FeedPostPreviewComponent} from './components/blog/blog-post/blog-post-feed-preview/feed-post-preview.component';
import {BlogPostPageComponent} from "./components/blog/page/blog-post-page/blog-post-page.component";
import {StoreModule} from '@ngrx/store';
import {AuthEffects} from "./store/effects/auth.effects";
import {EffectsModule} from "@ngrx/effects";
import {authReducer} from "./store/reducers/auth.reducers";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {blogReducer} from "./store/reducers/blog.reducers";
import {BlogEffects} from "./store/effects/blog.effects";
import {postReducer} from "./store/reducers/post.reducers";
import {PostEffects} from "./store/effects/post.effects";
import {JwtInterceptor} from "./common/http/jwt.interceptor";
import {categoryReducer} from "./store/reducers/category.reducers";
import {CategoryEffects} from "./store/effects/category.effects";
import {subscriptionReducer} from "./store/reducers/subscription.reducers";
import {SubscriptionEffects} from "./store/effects/subscription.effects";
import { ErrorMessageComponent } from './components/ui-elements/error-message/error-message.component';
import { SuccessMessageComponent } from './components/ui-elements/success-message/success-message.component';
import { WarningMessageComponent } from './components/ui-elements/warning-message/warning-message.component';
import { BlogPostSettingsModalComponent } from './components/blog/blog-post/blog-post-settings-modal/blog-post-settings-modal.component';
import {PostContentLengthPipe} from "./pipes/PostContentPipe";
import { BlogPostHeaderComponent } from './components/blog/blog-post/blog-post-header/blog-post-header.component';
import {BlogDisplayNamePipePipe} from "./pipes/BlogNamePipe";
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {pageReducer} from "./store/reducers/page.reducers";
import { ConfirmModalComponent } from './components/ui-elements/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogPageComponent,
    BlogPostPageComponent,
    DefaultButtonComponent,
    SearchBarComponent,
    BlogPostPreviewListItemComponent,
    EditorComponent,
    EditorPageComponent,
    SvgButtonComponent,
    AuthorDataComponent,
    BlogStatisticsDataComponent,
    BlogPostPreviewListComponent,
    DefaultListComponent,
    BlogSettingsModalComponent,
    TextButtonComponent,
    DefaultInputComponent,
    LoginComponent,
    SignupComponent,
    AppMenuModalComponent,
    FeedPageComponent,
    SearchPageComponent,
    AvatarComponent,
    IconComponent,
    FeedPostPreviewComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    WarningMessageComponent,
    BlogPostSettingsModalComponent,
    PostContentLengthPipe,
    BlogDisplayNamePipePipe,
    BlogPostHeaderComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    StoreModule.forRoot( {
      auth: authReducer,
      blog: blogReducer,
      post: postReducer,
      category: categoryReducer,
      subscription: subscriptionReducer,
      page: pageReducer
    }),
    EffectsModule.forRoot([
      AuthEffects,
      BlogEffects,
      PostEffects,
      CategoryEffects,
      SubscriptionEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true
    }),
  ],

  providers: [
    HttpClient,
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AppModule { }
