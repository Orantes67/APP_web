import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardsComponent } from './post-cards/post-cards.component';
import { PostPageComponent } from './post-page/post-page.component';
import { AddPostComponent } from './modal/add-post/add-post.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UpdatePostComponent } from './modal/update-post/update-post.component';

@NgModule({
  declarations: [
    PostPageComponent,
    AddPostComponent,
    UpdatePostComponent,
    PostCardsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,

  ],
  exports:[
    PostCardsComponent,
    PostPageComponent,
    AddPostComponent,
    HttpClientModule
  ]
})
export class PostModule { }
