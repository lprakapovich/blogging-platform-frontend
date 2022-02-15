import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/core/home/home.component";
import {AboutComponent} from "./components/core/about/about.component";
import {SignupComponent} from "./components/auth/signup/signup.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {BlogComponent} from "./components/blog/blog/blog.component";
import {EditorPageComponent} from "./components/blog/editor/editor-page/editor-page.component";

const routes: Routes = [
  {path: "about", component: AboutComponent},
  {path: "home", component: HomeComponent},
  {path: "register", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "blog", component: BlogComponent},
  {path: "editor-page", component: EditorPageComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
