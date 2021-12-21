import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/core/home/home.component";
import {AboutComponent} from "./components/core/about/about.component";
import {SignUpComponent} from "./components/authentication/sign-up/sign-up.component";
import {LogInComponent} from "./components/authentication/log-in/log-in.component";
import {BlogComponent} from "./components/blog/blog/blog.component";

const routes: Routes = [
  {path: "about", component: AboutComponent},
  {path: "home", component: HomeComponent},
  {path: "signup", component: SignUpComponent},
  {path: "login", component: LogInComponent},
  {path: "blog", component: BlogComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
