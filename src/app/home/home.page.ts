import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  messages: any;
  newMessage: any;
  userName = 'Gergo06';
  constructor(private base: BaseService) {
    this.base
      .getMessages()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.messages = data;
      });
  }

  addMessage() {
    let body = {
      user: this.userName,
      time: new Date().toLocaleTimeString(),
      content: this.newMessage,
    };
    this.base.addMessage(body);
    this.newMessage = '';
  }

  deleteMessage(body: any) {
    this.base.deleteMessage(body);
  }
}
