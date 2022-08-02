import { Component } from '@angular/core';
import { FormFieldType } from 'src/app/enums/form.eum';
import { FormConfig } from 'src/app/interfaces/form-screen.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'src/app/interfaces/menu-screen.interface';
import { LeadsPageViewState as ViewState } from 'src/app/enums/viewstates.enum';
import { LeadsService } from 'src/app/services/leads.service';

@Component({
  selector: 'app-leads-page',
  templateUrl: './leads.page.html',
  styleUrls: ['./leads.page.scss'],
})
export class LeadsPage {
  viewState = ViewState;
  currentViewState = ViewState.MENU;

  constructor(private leadService: LeadsService) {}

  onLeadAdded(formValue: { [key: string]: string }) {
    this.leadService.addLead(formValue);
  }

  onViewStateSelected(viewState: number) {
    this.currentViewState = viewState;
  }
}
