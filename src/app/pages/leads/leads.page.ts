import { Component } from '@angular/core';
import { FormFieldType } from 'app/enums/form.eum';
import { FormConfig } from 'app/interfaces/form-screen.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { LeadsPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { LeadsService } from 'app/services/leads.service';

@Component({
  selector: 'app-leads-page',
  templateUrl: './leads.page.html',
  styleUrls: ['./leads.page.scss'],
})
export class LeadsPage {
  viewState = ViewState;
  currentViewState = ViewState.MENU;

  leads: any;

  constructor(private leadService: LeadsService) {}

  async ngOnInit() {
    this.getLeads();
  }

  onLeadAdded(formValue: { [key: string]: string }) {
    this.leadService.addLead(formValue);
  }

  onViewStateSelected(viewState: number) {
    this.currentViewState = viewState;
  }

  private async getLeads(): Promise<void> {
    this.leads = await this.leadService.getLeads();
  }
}
