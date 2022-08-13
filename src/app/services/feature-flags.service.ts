import { Injectable } from '@angular/core';
import { FlagData } from 'app/interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagsService {
  getUserFeatureFlags(): FlagData {
    return sessionStorage['flags'] ? JSON.parse(sessionStorage['flags']) : {};
  }

  async updateUserFlags(flags: FlagData): Promise<void> {}
}
