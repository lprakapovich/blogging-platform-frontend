import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from "./components/auth/signup/signup.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {BlogPageComponent} from "./components/blog/blog-page/blog-page.component";
import {EditorPageComponent} from "./components/blog/editor-page/editor-page.component";
import {FeedPageComponent} from "./components/blog/feed-page/feed-page.component";
import {SearchPageComponent} from "./components/blog/search-page/search-page.component";
import {BlogPostComponent} from "./components/blog/blog-post/blog-post.component";

// todo introduce child routes
const routes: Routes = [
  {path: "home", component: FeedPageComponent},
  {path: "register", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "blog/:blogId", component: BlogPageComponent},
  {path: "editor", component: EditorPageComponent},
  {path: "search", component: SearchPageComponent},
  {path: "feed", component: FeedPageComponent},
  {path: "publication/:blogId/:postId", component: BlogPostComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
