import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@thirty-for-thirty-progress-tracker/core-state';

@Component({
  selector: 'thirty-for-thirty-progress-tracker-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authType = 'login';

  form: FormGroup;

  constructor(private authFacade: AuthFacade) {
    this.buildForm();
  }

  submit() {
    if(this.authType === 'register') {
      this.authFacade.register({...this.form.value});
    } else if(this.authType === 'login') {
      this.authFacade.authenticate({...this.form.value});
    }
  }

  toggleAuthType() {
    this.authType = this.authType === 'register' ? 'login' : 'register';
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      phone: new FormControl('')
    });
  }
}
