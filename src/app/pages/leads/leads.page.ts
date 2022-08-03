import { Component } from '@angular/core';
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
  lead: { [key: string]: string } = {};

  constructor(private leadService: LeadsService) {}

  async ngOnInit() {
    await this.getLeads();
  }

  onLeadAdded(formValue: { [key: string]: string }) {
    this.leadService.addLead(formValue);
  }

  onLeadClicked(index: number) {
    this.lead = this.leads[index]['data'];
    this.currentViewState = ViewState.VIEW_LEAD;
  }

  onViewStateSelected(viewState: number) {
    this.currentViewState = viewState;
  }

  private async getLeads(): Promise<void> {
    this.leads = await this.leadService.getLeads();
  }
}
