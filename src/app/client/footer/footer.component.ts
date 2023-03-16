import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { AuthService, default_user } from '../shared/services/auth.service';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { TypeOfUser } from 'src/models/TypeOfUser.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit {
  protected user!: TypeOfUser;
  protected activePopup: boolean = false;
  protected hover: string = '';
  protected hideGoogle: string = '';
  constructor(
    private authService: AuthService,
    private ngZone: NgZone,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user: TypeOfUser) => {
      this.ngZone.run(() => {
        this.user = user;
        if (user.img && user.name) {
          this.hideGoogle = 'hide-g';
        } else {
          this.hideGoogle = '';
        }
      });
    });
  }
  ngAfterViewInit(): void {
    this.authService.initAuthorization();
    this.authService.renderGoogleBtn();
    if (!this.user.img && !this.user.name) {
      this.authService.renderGooglePrompt();
    }
  }
  openPopup() {
    if (this.activePopup) {
      this.activePopup = false;
      this.hover = '';
    } else {
      this.activePopup = true;
      this.hover = 'hide';
    }
  }
  logOut() {
    this.sessionStorageService.deleteData('user');
    this.sessionStorageService.deleteData('token');
    this.popupClose();
    this.authService.setData(default_user);
  }

  popupClose() {
    this.activePopup = false;
    this.hover = '';
  }
}
