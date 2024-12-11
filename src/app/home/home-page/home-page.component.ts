import { Component, OnInit } from '@angular/core';
import { Post } from '../../posts/interface/post';
import { HomeService } from '../service/home.service'; // Usar HomeService

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  posts: Post[] = [];
  editingPost: Post | null = null;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getPostsObservable().subscribe({
        next: (posts) => {
            if (!posts || posts.length === 0) {
                console.warn('No hay posts para mostrar.');
            }
            this.posts = posts;
        },
        error: (err) => {
            console.error('Error cargando posts:', err);
        }
    });
}




  refreshPosts(): void {
    this.editingPost = null; // Reset edit state
    this.homeService.getPostsObservable().subscribe({
      next: (posts) => {
        this.posts = posts; // Actualiza los posts con los más recientes
      }
    });
  }

  selectPostForEdit(post: Post): void {
    this.editingPost = JSON.parse(JSON.stringify(post)); // Crear una copia profunda del objeto
}




  cancelEdit(): void {
    this.editingPost = null; // Salir del modo de edición
  }
}
