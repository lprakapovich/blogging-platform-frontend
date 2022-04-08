import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/core/home/home.component';
import {NavbarComponent} from './components/navigation/navbar/navbar.component';
import {BlogComponent} from './components/blog/blog/blog.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {DefaultButtonComponent} from './components/ui-elements/default-button/default-button.component';
import {SearchBarComponent} from './components/ui-elements/search-bar/search-bar.component';
import {BlogPostPreviewComponent} from './components/blog/blog-post-preview/blog-post-preview.component';
import {EditorComponent} from './components/blog/editor/editor/editor.component';
import {EditorPageComponent} from './components/blog/editor/editor-page/editor-page.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DropDownMenuComponent} from './components/ui-elements/drop-down-menu/drop-down-menu.component';
import {SvgButtonComponent} from './components/ui-elements/svg-button/svg-button.component';
import {AuthorDataComponent} from './components/blog/author-data/author-data.component';
import {BlogStatisticsDataComponent} from './components/blog/blog-statistics-data/blog-statistics-data.component';
import {BlogPostPreviewListComponent} from './components/blog/blog-post-preview-list/blog-post-preview-list.component';
import {DefaultListComponent} from './components/ui-elements/default-list/default-list.component';
import {BlogSettingsModalComponent} from './components/blog/blog-settings-modal/blog-settings-modal.component';
import {TextButtonComponent} from './components/ui-elements/text-button/text-button.component';
import {DefaultInputComponent} from './components/ui-elements/default-input/default-input.component';
import {DefaultSearchBarComponent} from './components/ui-elements/default-search-bar/default-search-bar.component';
import {LoginComponent} from './components/auth/login/login.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import {AppMenuModalComponent} from './components/ui-elements/app-menu-modal/app-menu-modal.component';
import {ClickOutsideDirective} from './directive/click-outside.directive';
import {FeedComponent} from './components/blog/feed/feed.component';
import {SearchResultComponent} from './components/blog/search-result/search-result.component';
import {AvatarComponent} from './components/ui-elements/avatar/avatar.component';
import {IconComponent} from './components/ui-elements/icon/icon.component';
import {FeedPostPreviewComponent} from './components/blog/feed-post-preview/feed-post-preview.component';
import {BlogPostComponent} from "./components/blog/blog-post/blog-post.component";
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
import { BlogPostSettingsModalComponent } from './components/blog/blog-post-settings-modal/blog-post-settings-modal.component';

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
    DefaultListComponent,
    BlogSettingsModalComponent,
    TextButtonComponent,
    DefaultInputComponent,
    DefaultSearchBarComponent,
    LoginComponent,
    SignupComponent,
    AppMenuModalComponent,
    ClickOutsideDirective,
    FeedComponent,
    SearchResultComponent,
    AvatarComponent,
    IconComponent,
    FeedPostPreviewComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    WarningMessageComponent,
    BlogPostSettingsModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    StoreModule.forRoot( {
      auth: authReducer,
      blog: blogReducer,
      post: postReducer,
      category: categoryReducer,
      subscription: subscriptionReducer
    }),
    EffectsModule.forRoot([
      AuthEffects,
      BlogEffects,
      PostEffects,
      CategoryEffects,
      SubscriptionEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true
    }),
  ],

  providers: [
    HttpClient,
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AppModule { }
