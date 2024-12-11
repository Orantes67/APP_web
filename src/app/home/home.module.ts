import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from './home-card/home-card.component';
import { HomePageComponent } from './home-page/home-page.component';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeService } from './service/home.service';
import { TokenService } from '../token/token.service';

@NgModule({
  declarations: [
    HomeCardComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,FormsModule,HttpClientModule,BrowserModule
  ],exports:[
    HomeCardComponent,
    HomePageComponent,
  ],providers:[
    HomeService,TokenService
  ]
})
export class HomeModule { }
