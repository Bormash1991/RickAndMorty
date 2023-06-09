import {
  Component,
  OnInit,
  AfterViewInit,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { AuthService, default_user } from '../shared/services/auth.service';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { TypeOfUser } from 'src/models/TypeOfUser.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit, OnDestroy {
  protected user!: TypeOfUser;
  protected activePopup: boolean = false;
  protected hover: string = '';
  protected hideGoogle: string = '';
  private authSubj!: Subscription;
  constructor(
    private authService: AuthService,
    private ngZone: NgZone,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit() {
    this.authSubj = this.authService.getUser().subscribe((user: TypeOfUser) => {
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
  protected openPopup() {
    if (this.activePopup) {
      this.activePopup = false;
      this.hover = '';
    } else {
      this.activePopup = true;
      this.hover = 'hide';
    }
  }
  protected logOut() {
    this.sessionStorageService.deleteData('user');
    this.sessionStorageService.deleteData('token');
    this.popupClose();
    this.authService.setData(default_user);
  }

  protected popupClose() {
    this.activePopup = false;
    this.hover = '';
  }
  ngOnDestroy(): void {
    this.authSubj.unsubscribe();
  }
}
