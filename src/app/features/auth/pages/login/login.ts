import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../../../core/auth/services/auth';
import { Router } from '@angular/router';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  public loginForm: FormGroup;
  public loginError: string | null = null; 
  public showPassword = false;

  faUser = faUser;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private fb: FormBuilder,       
    private authService: Auth,
    private router: Router         
  ) {
    // Inicializamos el formulario
    this.loginForm = this.fb.group({
      user_email:    ['', [Validators.required, Validators.email]],
      user_password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/salones']);
    }
  }

  /**
   * Método que se llama al enviar el formulario
   */
  public onSubmit(): void {
    this.loginError = null; // Resetea el error

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); 
      return;
    }

    // valores del formulario
    const { user_email, user_password } = this.loginForm.value;


    this.authService.login(user_email, user_password).subscribe({
      next: (response) => {
        this.router.navigate(['/salones']);
      },
      error: (err) => {
        console.error('Error en el login:', err);
        this.loginError = 'Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.';
      }
    });
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
