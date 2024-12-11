import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../../posts/interface/post';
import { LocalStorageService } from '../../service/local-storage.service';
import { CredentialsService } from '../../credentials/service/credentials.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private storageKey = 'posts';
  private postsSubject = new BehaviorSubject<Post[]>(this.getPosts());

  constructor(
    private localStorageService: LocalStorageService,
    private credentialsService: CredentialsService
  ) {}

  private getCurrentUserId(): number | null {
    const token = this.credentialsService.getToken();
    if (!token) {
        console.error('No se encontró token.');
        return null;
    }
    const userIdString = token.split('-')[0];
    const userId = Number(userIdString);
    if (isNaN(userId)) {
        console.error('Error al extraer el userId del token.');
        return null;
    }
    return userId;
}

  getPosts(): Post[] {
    const currentUserId = this.getCurrentUserId();
    const allPosts = this.localStorageService.getItem<Post[]>(this.storageKey) || [];
    return allPosts.filter(post => post.usuario_id === currentUserId);
  }

  getPostsObservable(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  updatePost(updatedPost: Post): void {
    const currentPosts = this.postsSubject.getValue();
    const updatedPosts = currentPosts.map(post =>
        post.post_id === updatedPost.post_id ? updatedPost : post
    );
    this.localStorageService.setItem(this.storageKey, updatedPosts);
    this.postsSubject.next(updatedPosts);
}

deletePost(postId: number): void {
    const currentPosts = this.postsSubject.getValue();
    const filteredPosts = currentPosts.filter(post => post.post_id !== postId);
    this.localStorageService.setItem(this.storageKey, filteredPosts);
    this.postsSubject.next(filteredPosts);
}

}
