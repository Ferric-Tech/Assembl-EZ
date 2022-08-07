import { Component, EventEmitter, Output } from '@angular/core';
import { FormFieldType } from 'app/enums/form.eum';
import { FormConfig } from 'app/interfaces/form-screen.interface';
import {
  MenuOption,
  MenuOptionStyle,
  MenuOptionType,
} from 'app/interfaces/menu-screen.interface';
import { AgentPageViewState as ViewState } from 'app/enums/viewstates.enum';

@Component({
  selector: 'app-new-agent-screen',
  templateUrl: './new-agent.screen.html',
  styleUrls: ['./new-agent.screen.scss'],
})
export class NewAgentScreen {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();
  @Output() viewStateSelected = new EventEmitter<number>();

  menuOptions: MenuOption[] = [
    {
      style: MenuOptionStyle.SECONDARY,
      display: 'Back to agent menu',
      optionType: MenuOptionType.VIEWSTATE,
      viewState: ViewState.MENU,
    },
  ];

  newAgentFormConfig: FormConfig = {
    formTitle:
      "Please provide the new agent's detauls \
      and we will send them an email to let them \
      know you have regustered them",
    isInExpansionTable: false,
    isDynamic: false,
    canProceed: false,
    fields: [
      {
        fieldDisplay: 'First name',
        fieldName: 'firstName',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Last name',
        fieldName: 'lastName',
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
        fieldDisplay: 'Contact number',
        fieldName: 'contactNumber',
        fieldType: FormFieldType.INPUT_GENERAL,
        defaultValue: '',
      },
      {
        fieldDisplay: 'Password',
        fieldName: 'password',
        fieldType: FormFieldType.PASSWORD,
        defaultValue: '',
      },
    ],
    proceedText: 'Proceed',
  };

  onNewAgentFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }

  onViewStateSelected(viewState: ViewState) {
    this.viewStateSelected.emit(viewState);
  }
}
