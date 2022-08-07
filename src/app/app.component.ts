import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication-service.service';
import { ClientProfileService } from './services/client-profile.service';
import { DataManagementService } from './services/data-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'assembl-ez';

  constructor(
    private authService: AuthenticationService,
    private clientProfileService: ClientProfileService
  ) {}

  async ngOnInit() {
    (await this.authService.isAuthenticated())
      ? this.clientProfileService.getClientData()
      : null;
  }
}
