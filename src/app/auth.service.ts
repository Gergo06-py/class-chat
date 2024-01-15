import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSub = new Subject();
  confirm: any;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    this.fireAuth.onAuthStateChanged((user) => {
      this.userSub.next(user);
    });
  }

  getUser() {
    return this.userSub;
  }

  logout() {
    return this.fireAuth.signOut().then(
      () => {this.router.navigate(['/sign-in']);},
    );
  }

  signInWithPhone(phoneNumber: any, applicationVerifier: any) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth
        .signInWithPhoneNumber(phoneNumber, applicationVerifier)
        .then((confirm) => {
          this.confirm = confirm;
          resolve(true);
        })
        .catch(() => {
          reject('SMS not sent');
        });
    });
  }

  verificationCode(code: any) {
    return this.confirm.confirm(code);
  }
}
