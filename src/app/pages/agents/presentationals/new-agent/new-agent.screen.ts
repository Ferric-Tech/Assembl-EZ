import { Component, EventEmitter, Output } from '@angular/core';
import { FormFieldType } from 'app/enums/form.eum';
import { FormConfig } from 'app/interfaces/form-screen.interface';

@Component({
  selector: 'app-new-agent-screen',
  templateUrl: './new-agent.screen.html',
  styleUrls: ['./new-agent.screen.scss'],
})
export class NewAgentScreen {
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>();

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
    ],
    proceedText: 'Proceed',
  };

  onNewAgentFormSubmitted(formValue: { [key: string]: string }) {
    this.formSubmitted.emit(formValue);
  }
}
