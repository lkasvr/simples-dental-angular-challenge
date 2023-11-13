import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service/auth-service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'form-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './login.form.component.html',
  styleUrl: './login.form.component.scss',
  providers: [AuthService]
})
export class LoginFormComponent {
  private authService = inject(AuthService);

  passwordHide = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [ Validators.required, Validators.minLength(8)]),
  })

  onSubmit() {
    const { email, password } = this.loginForm.value;
    console.log({ email, password });

    if (!email || !password) return ;

    const userSession = this.authService.signIn({ email, password });

    console.log(userSession);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getErrorMessage(inputControl: AbstractControl<string | null, string | null> | null) {
    if (inputControl?.hasError('required')) return 'O campo não pode ser vazio';
    if (inputControl?.hasError('email')) return 'Email inválido';
    if (inputControl?.hasError('minlength')) return 'A senhe deve conter no mínimo 8 caracteres';
    return '';
  }
}
