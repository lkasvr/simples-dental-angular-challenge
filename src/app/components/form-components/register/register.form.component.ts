import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../../services/auth-service/auth-service';

@Component({
  selector: 'form-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './register.form.component.html',
  styleUrl: './register.form.component.scss',
  providers: [AuthService]
})
export class RegisterFormComponent {
  private authService = inject(AuthService);

  passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?!.*(\d)\1{2,}).{8,}$/;
  passwordHide = true;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.passwordRegExp)
      ]),
    toConfirmePassword: new FormControl( '', [Validators.required])
  })

  onSubmit() {
    const { email, password, toConfirmePassword } = this.registerForm.value;
    console.log({ email, password });
    if (toConfirmePassword !== password) return alert('As senhas devem corresponder.')

    if (email && password) {
      console.log(this.authService.registerUser({ email, password }));
    };
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get toConfirmePassword() {
    return this.registerForm.get('toConfirmePassword');
  }

  getErrorMessage(
    inputControl: AbstractControl<string | null, string | null> | null,
    inputType?: 'email' | 'password' | 'toConfirmePassword') {
    if (inputControl?.hasError('required')) return 'O campo não pode ser vazio';
    if (inputControl?.hasError('email')) return 'Email inválido';
    if (inputControl?.status === 'INVALID' && inputType === 'password')
      return '*ao menos uma letra maíuscula e mínuscula\n*ao menos um número\*ao menos um caractere especial\n*Sequência de números não permitida (111)';

    return '';
  }
}
