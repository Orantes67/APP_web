import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Post } from '../../interface/post';
import { HomeService } from '../../../home/service/home.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  @Input() post!: Post;
  @Output() postUpdated = new EventEmitter<void>();
  @Output() editCanceled = new EventEmitter<void>();

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    if (!this.post) {
      this.post = { post_id: 0, usuario_id: 0, titulo: '', descripcion: '', fecha: '' };
    }
  }

  onSubmit(): void {
    if (!this.post.titulo || !this.post.descripcion) {
        console.error('El título y la descripción son obligatorios.');
        return;
    }
    this.homeService.updatePost(this.post);
    this.postUpdated.emit();
}


  cancelEdit(): void {
    this.editCanceled.emit(); 
  }
}
