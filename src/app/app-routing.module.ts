import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/core/home/home.component";
import {SignupComponent} from "./components/auth/signup/signup.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {BlogComponent} from "./components/blog/blog/blog.component";
import {EditorPageComponent} from "./components/blog/editor/editor-page/editor-page.component";
import {FeedComponent} from "./components/blog/feed/feed.component";
import {SearchResultComponent} from "./components/blog/search-result/search-result.component";

const routes: Routes = [
  {path: "home", component: FeedComponent},
  {path: "register", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "blog", component: BlogComponent},
  {path: "editor-page", component: EditorPageComponent},
  {path: "search", component: SearchResultComponent},
  {path: '', component: FeedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
