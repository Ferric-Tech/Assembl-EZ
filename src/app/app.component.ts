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
  loadingExplainer = '';

  constructor(
    private authService: AuthenticationService,
    private clientProfileService: ClientProfileService,
    private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    this.intialiseSubscriptions();
    this.loadingService.setLoading('Calling Profile');
    if (await this.authService.isAuthenticated()) {
      this.intialiseSession();
    }
    this.loadingService.cancelLoading();
  }

  private intialiseSubscriptions() {
    // Loading service
    this.loadingService._isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.loadingService._loadingexplainer$.subscribe((loadingexplainer) => {
      this.loadingExplainer = loadingexplainer;
    });
  }

  private async intialiseSession() {
    await this.clientProfileService.getClientData();
  }
}
