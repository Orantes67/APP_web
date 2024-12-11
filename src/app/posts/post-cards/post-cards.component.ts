import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../interface/post';

@Component({
  selector: 'post-cards',
  templateUrl: './post-cards.component.html',
  styleUrls: ['./post-cards.component.css']
})
export class PostCardsComponent implements OnInit {
  posts: Post[] = [];
  editablePost: Post | null = null; // Post que está en edición
  editableDescripcion: string = ''; // Variable auxiliar para la descripción
  newComments: { [key: number]: string } = {}; // Diccionario de comentarios por post

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPostsObservable().subscribe((posts) => {
      this.posts = posts; // Actualiza los posts cuando cambian
    });
  }

  deletePost(postId: number): void {
    this.postService.deletePost(postId); // Eliminar post
  }

  enableEdit(post: Post): void {
    this.editablePost = { ...post }; // Crea una copia del post a editar
    this.editableDescripcion = post.descripcion; // Copia la descripción
  }

  saveEdit(): void {
    if (this.editablePost) {
      this.editablePost.descripcion = this.editableDescripcion; // Actualiza la descripción
      this.postService.updatePost(this.editablePost); // Llama al servicio para guardar cambios
      this.cancelEdit(); // Salir del modo de edición
    }
  }

  cancelEdit(): void {
    this.editablePost = null; // Restablece el post editable
    this.editableDescripcion = ''; // Limpia la descripción
  }

  isEditing(postId: number): boolean {
    return this.editablePost?.post_id === postId; // Verifica si un post está en modo edición
  }

  // Función para rellenar el comentario en el input automáticamente
  autoFillComment(postId: number, comentarioContenido: string): void {
    this.newComments[postId] = comentarioContenido; // Asigna el contenido al input del post específico
  }

  addComment(postId: number): void {
    if (this.newComments[postId]?.trim()) {
      const comentario = {
        usuario_id:1, // Obtén el ID del usuario actual del TokenService
        contenido: this.newComments[postId].trim(),
        fecha: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
      };
      this.postService.addComment(postId, comentario); // Agrega el comentario al servicio
      this.newComments[postId] = ''; // Limpia el campo de texto
    }
  }
}
