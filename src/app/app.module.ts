import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CredentialsModule } from "./credentials/credentials.module";
import { NavigationModule } from "./navigation/navigation.module";
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeModule } from './home/home.module';
import { PostModule } from './posts/post.module';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CredentialsModule,
    NavigationModule,
    HomeModule,
    PostModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
