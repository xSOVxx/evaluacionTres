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

  // Variable para nuestro formulario
  public loginForm: FormGroup;
  public loginError: string | null = null; // Para mostrar mensajes de error
  public showPassword = false;

  faUser = faUser;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private fb: FormBuilder,         // Inyectamos FormBuilder para crear el form
    private authService: Auth, // Inyectamos nuestro servicio de Auth
    private router: Router          // Inyectamos el Router para navegar
  ) {
    // Inicializamos el formulario
    this.loginForm = this.fb.group({
      // El nombre debe coincidir con el JSON: 'user_email' y 'user_password'
      user_email:    ['', [Validators.required, Validators.email]],
      user_password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Si el usuario ya está logueado, que no pueda ver esta página
    // y lo mandamos directo a la app.
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/salones']);
    }
  }

  /**
   * Método que se llama al enviar el formulario
   */
  public onSubmit(): void {
    this.loginError = null; // Resetea el error

    // Si el formulario no es válido, no hacemos nada
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Marca todos los campos como "tocados"
      return;
    }

    // Obtenemos los valores del formulario
    const { user_email, user_password } = this.loginForm.value;

    // Llamamos al método login() de nuestro servicio
    this.authService.login(user_email, user_password).subscribe({
      next: (response) => {
        // ¡Éxito! Navegamos a la página principal de la app
        // La ruta '/salones' está protegida por el AuthGuard,
        // pero como ya estamos logueados, nos dejará pasar.
        this.router.navigate(['/salones']);
      },
      error: (err) => {
        // Ocurrió un error (ej: contraseña incorrecta)
        console.error('Error en el login:', err);
        this.loginError = 'Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.';
      }
    });
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
