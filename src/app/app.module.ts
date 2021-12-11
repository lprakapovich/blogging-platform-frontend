import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/core/home/home.component';
import { AboutComponent } from './components/core/about/about.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { LogInComponent } from './components/authentication/log-in/log-in.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { H2ComponentComponent } from './editor-components/h2-component/h2-component.component';
import { H3ComponentComponent } from './editor-components/h3-component/h3-component.component';
import { PlainTextComponentComponent } from './editor-components/plain-text-component/plain-text-component.component';
import { H2Component } from './components/blog/editor/editor-components/h2/h2.component';
import { H3Component } from './components/blog/editor/editor-components/h3/h3.component';
import { PlainTextComponent } from './components/blog/editor/editor-components/plain-text/plain-text.component';
import { NumberedComponent } from './components/blog/editor/editor-components/numbered/numbered.component';
import { BulletedComponent } from './components/blog/editor/editor-components/bulleted/bulleted.component';
import { BlogComponent } from './components/blog/blog/blog.component';
import { BlogpostComponent } from './components/blog/blogpost/blogpost.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SignUpComponent,
    LogInComponent,
    NavbarComponent,
    H2ComponentComponent,
    H3ComponentComponent,
    PlainTextComponentComponent,
    H2Component,
    H3Component,
    PlainTextComponent,
    NumberedComponent,
    BulletedComponent,
    BlogComponent,
    BlogpostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
