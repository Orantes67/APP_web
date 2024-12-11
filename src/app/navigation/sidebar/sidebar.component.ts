import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsService } from '../../credentials/service/credentials.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] 
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService
  ) {}
  logout() {
    this.router.navigate(['/login']);
    this.credentialsService.logout();
  }

  navigation(id: number) {
  
    if (id == 2) {
      this.router.navigate(['/post']);
    }
  }
}

