import { Injectable } from '@angular/core';
import { Post,Comentario } from '../interface/post';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private storageKey = 'posts';
  private postsSubject = new BehaviorSubject<Post[]>(this.getPosts());

  constructor() {
    
  }

  createPost(post: Post): void {
    const posts = this.getPosts();
    post.post_id = posts.length > 0 ? Math.max(...posts.map(p => p.post_id)) + 1 : 1;
    posts.push(post);
    localStorage.setItem(this.storageKey, JSON.stringify(posts));
    this.postsSubject.next(posts); 
  }

  getPosts(): Post[] {
    const posts = localStorage.getItem(this.storageKey);
    return posts ? JSON.parse(posts) : [];
  }

  getPostsObservable() {
    return this.postsSubject.asObservable();
  }

  deletePost(postId: number): void {
    const posts = this.getPosts().filter(post => post.post_id !== postId);
    localStorage.setItem(this.storageKey, JSON.stringify(posts));
    this.postsSubject.next(posts); 
  }

  updatePost(updatedPost: Post): void {
    const currentPosts = this.getPosts();
    const updatedPosts = currentPosts.map(post =>
      post.post_id === updatedPost.post_id ? updatedPost : post
    );
    localStorage.setItem(this.storageKey, JSON.stringify(updatedPosts));
    this.postsSubject.next(updatedPosts);
  }

  addComment(postId: number, comentario: Comentario): void {
    const posts = this.getPosts();
    const postIndex = posts.findIndex(post => post.post_id === postId);
    if (postIndex !== -1) {
      posts[postIndex].comentarios = posts[postIndex].comentarios || [];
      posts[postIndex].comentarios.push(comentario);
      localStorage.setItem(this.storageKey, JSON.stringify(posts));
      this.postsSubject.next(posts);
    }
  }
  
  
}