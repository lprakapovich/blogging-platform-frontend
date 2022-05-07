import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from "./components/auth/signup/signup.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {BlogPageComponent} from "./components/blog/page/blog-page/blog-page.component";
import {EditorPageComponent} from "./components/blog/page/editor-page/editor-page.component";
import {FeedPageComponent} from "./components/blog/page/feed-page/feed-page.component";
import {SearchPageComponent} from "./components/blog/page/search-page/search-page.component";
import {BlogPostPageComponent} from "./components/blog/page/blog-post-page/blog-post-page.component";
import {AuthGuard} from "./util/AuthGuard";

// todo introduce child routes
const routes: Routes = [
  {path: "home", component: FeedPageComponent},
  {path: "register", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "blog/:blogId", component: BlogPageComponent, canActivate: [AuthGuard]},
  {path: "editor", component: EditorPageComponent, canActivate: [AuthGuard]},
  {path: "search", component: SearchPageComponent, canActivate: [AuthGuard]},
  {path: "feed", component: FeedPageComponent, canActivate: [AuthGuard]},
  {path: "publication/:blogId/:postId", component: BlogPostPageComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
