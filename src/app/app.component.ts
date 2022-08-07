import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication-service.service';
import { ClientProfileService } from './services/client-profile.service';
import { DataManagementService } from './services/data-management.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'assembl-ez';
  isLoading = false;

  constructor(
    private authService: AuthenticationService,
    private clientProfileService: ClientProfileService,
    private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    (await this.authService.isAuthenticated())
      ? this.clientProfileService.getClientData()
      : null;

    this.loadingService._isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
