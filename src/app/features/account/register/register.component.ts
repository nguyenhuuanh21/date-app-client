import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account.service';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TextInputComponent } from '../../../shared/text-input/text-input.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, JsonPipe, TextInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private account = inject(AccountService)
  private fb = inject(FormBuilder)
  private router = inject(Router)
  membersFromHome = input.required<User[]>();
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds
  protected credentialsForm: FormGroup;
  protected profileForm: FormGroup;
  protected currentStep = signal<number>(1);
  protected validationErrors = signal<string[]>([])
  constructor() {
    this.credentialsForm = this.fb.group({
      email: ['a@gmail.com', [Validators.required, Validators.email]],
      displayName: ['a', [Validators.required, Validators.minLength(3)]],
      password: ['123', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
      confirmPassword: ['123', [Validators.required, this.matchValues('password')]]
    })
    this.profileForm = this.fb.group({
      gender: ['male', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]]
    })
    this.credentialsForm.controls['password'].valueChanges.subscribe({
      next: () => {
        this.credentialsForm.controls['confirmPassword'].updateValueAndValidity();
      }
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent
      if (!parent) return null
      const matchValue = parent.get(matchTo)?.value
      return control.value === matchValue ? null : { passwordMismatch: true }
    }
  }
  nextStep() {
    if (this.credentialsForm.valid) {
      this.currentStep.update(step => step + 1)
    }
  }
  prevStep() {
    this.currentStep.update(step => step - 1)
  }
  getMaxDate() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18)
    return today.toISOString().split('T')[0]
  }
  register() {
    if (this.credentialsForm.valid && this.profileForm.valid) {
      const { confirmPassword, ...credentials } = this.credentialsForm.value;

      const formData = {
        ...credentials,
        ...this.profileForm.value
      };
      this.account.register(formData).subscribe({
        next: (res) => {
          this.router.navigateByUrl('/');
          alert('Register successfully')
        },
        error: (err) => {
          alert(err.message)
          this.validationErrors.set(err.message)
        }
      })
    }

  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
