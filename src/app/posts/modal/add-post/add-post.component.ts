import { Component } from '@angular/core';
import { Post } from '../../interface/post';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  post: Post = {
    fecha: '',
    titulo: '',
    descripcion: '',
    usuario_id: 0,
    post_id: 0
  };

  constructor(private postService: PostService) {}

  addPost(): void {
    this.postService.createPost(this.post); // Crear post
    this.resetForm(); // Reiniciar formulario
  }

  private resetForm(): void {
    this.post = {
      fecha: '',
      titulo: '',
      descripcion: '',
      usuario_id: 0,
      post_id: 0
    };
  }
}