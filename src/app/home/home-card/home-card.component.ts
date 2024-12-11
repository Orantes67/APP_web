import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../posts/interface/post';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent {
  @Input() posts: Post[] = [];
  @Output() editSelected = new EventEmitter<Post>();

  constructor(private homeService: HomeService) {}


  editPost(post: Post): void {
    this.editSelected.emit(post); // Emitir el post para editarlo
  }
}
