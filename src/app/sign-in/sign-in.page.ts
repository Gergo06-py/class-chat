import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  phoneNumber = '+36206287355';
  code = '111111';
  recaptchaInvisible: any;

  constructor(private auth: AuthService, private router: Router) {}

  ionViewDidEnter() {
    this.recaptchaInvisible = new RecaptchaVerifier(
      getAuth(),
      'recaptcha-container',
      {
        size: 'invisible',
        callback: '',
        'expired-callback': '',
      }
    );
  }

  signInWithPhone() {
    this.auth
      .signInWithPhone(this.phoneNumber, this.recaptchaInvisible)
      .then((confirm) => {
        // Kód bekér
        console.log('SMS elküldve');
      });
  }

  verificationCode() {
    this.auth
      .verificationCode(this.code)
      .then((user: any) => {
        console.log('User:', user);
        this.router.navigate(['/home']);
      })
      .catch((error: any) => {
        console.log('Code hiba!');
      });
  }
}
