import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { CredentialsService } from '../service/credentials.service';
import { CredentialsI } from '../interface/credentials';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: CredentialsI = {
    correo_id: '',
    contrasena_id: ''
  };

  message: string = '';
  isLoading: boolean = false; 

  constructor(
    private credentialsService: CredentialsService,
    private router: Router
  ) {}

  login(): void {
    this.isLoading = true; 
    this.credentialsService.loginUser(this.credentials).subscribe(success => {
      this.isLoading = false; 
      this.message = success ? 'Inicio de sesión exitoso' : 'Credenciales incorrectas';
      if (success) {
        this.router.navigate(['/post']); 
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
