import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormFieldType } from 'app/enums/form.eum';
import {
  FormConfig,
  FormFieldOption,
} from 'app/interfaces/form-screen.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { LeadsPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { AuthenticationService } from 'app/services/authentication-service.service';
import { AgentService } from 'app/services/agent.service';

@Component({
  selector: 'app-add-lead-screen',
  templateUrl: './add-lead.screen.html',
  styleUrls: ['./add-lead.screen.scss'],
})
export class AddLeadScreen {
  @Input() assignToOptions: FormFieldOption[] = [];
  @Output() leadAdded = new EventEmitter<{ [key: string]: string }>();
  @Output() viewStateSelected = new EventEmitter<number>();

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.PRIMARY,
      display: 'Back to lead menu',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.MENU,
    },
  ];

  newLeadFormConfig: FormConfig = {
    formTitle: 'Add a new lead by filling out the details below',
    isInExpansionTable: false,
    isDynamic: false,
    canProceed: false,
    fields: [
      {
        fieldDisplay: 'Name',
        fieldName: 'name',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Email',
        fieldName: 'email',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Assign to',
        fieldName: 'assignedTo',
        fieldType: FormFieldType.SELECT,
        defaultValue: '',
      },
    ],
    proceedText: 'Proceed',
  };

  ngOnInit() {
    this.newLeadFormConfig.fields[2].options = this.assignToOptions;
  }

  onLeadAdded(formValue: { [key: string]: string }) {
    this.leadAdded.emit(formValue);
  }

  onViewStateSelected(viewState: number) {
    this.viewStateSelected.emit(viewState);
  }
}
