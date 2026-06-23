import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private account=inject(AccountService)
  membersFromHome=input.required<User[]>();
  cancelRegister=output<boolean>();
  protected creds: RegisterCreds = {
    displayName: '',
    password: '',
    email: ''
  }
  register(){
    this.account.register(this.creds).subscribe({
      next:(res)=>{
        this.cancel();
        alert('Registration successful')

      },
      error:(err)=>alert(err.message)
    })
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
}
