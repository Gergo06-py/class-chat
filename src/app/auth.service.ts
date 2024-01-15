import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSub = new Subject();

  constructor(private fireAuth: AngularFireAuth) { 
    this.fireAuth.onAuthStateChanged((user) => {
      this.userSub.next(user);
    })
  }

  getUser() {
    return this.userSub;
  }

  logout() {
    this.fireAuth.signOut();
  }
}
