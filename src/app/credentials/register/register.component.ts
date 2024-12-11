import { Component } from '@angular/core';
import { CredentialsService } from '../service/credentials.service';
import { UserI } from '../interface/user';
import { Router } from '@angular/router'; 

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: UserI = {
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    edad: 0,
    correo_id: '',
    contrasena_id: ''
  };

  message: string = ''; 

  constructor(
    private credentialsService: CredentialsService,
    private router: Router // Inyectar Router
  ) {}

  register(): void {
    this.credentialsService.registerUser(this.user).subscribe((success: boolean) => {
      if (success) {
        this.message = 'Registro exitoso';
        this.router.navigate(['/login']); // Redirigir al login
        this.resetForm(); // Limpiar campos
      } else {
        this.message = 'Correo ya registrado';
      }
    });
  }

  private resetForm(): void {
    this.user = {
      nombre: '',
      apellido_p: '',
      apellido_m: '',
      edad: 0,
      correo_id: '',
      contrasena_id: ''
    };
  }
}