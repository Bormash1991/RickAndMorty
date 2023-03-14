import { Injectable } from '@angular/core';
import { CredentialResponse } from 'google-one-tap';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { TypeOfUser } from 'src/models/TypeOfUser.interface';
import { TypeOfDecodedUser } from 'src/models/TypeOfDecodedUser.interface';
export const default_user: TypeOfUser = {
  img: '',
  name: '',
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private sessionStorageService: SessionStorageService) {}
  private userdata$ = new BehaviorSubject<TypeOfUser>(
    this.sessionStorageService.getData<TypeOfUser>('user', default_user)
  );
  getUser() {
    return this.userdata$.asObservable();
  }
  initAuthorization() {
    window.google.accounts.id.initialize({
      client_id:
        '418722766094-udmocqq6cafs1ptf5kent2t2d67bva4n.apps.googleusercontent.com',
      auto_select: false,
      cancel_on_tap_outside: false,
      callback: (e) => this.decodeTokenAndSave(e),
    });
  }
  renderGoogleBtn() {
    window.google.accounts.id.renderButton(document.querySelector('#auth')!, {
      theme: 'outline',
      size: 'large',
      width: 100,
      text: 'signin',
      locale: 'en',
    });
  }
  renderGooglePrompt() {
    window.google.accounts.id.prompt();
  }
  decodeTokenAndSave(item: CredentialResponse) {
    const decodedUser: TypeOfDecodedUser = jwtDecode(item.credential);
    const user: TypeOfUser = {
      img: decodedUser.picture,
      name: decodedUser.name,
    };
    this.sessionStorageService.setData('user', user);
    this.sessionStorageService.setData('token', item.credential);
    this.setData(user);
  }
  setData(data: TypeOfUser) {
    this.userdata$.next(data);
  }
}
