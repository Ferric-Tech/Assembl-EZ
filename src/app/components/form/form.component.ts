import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormFieldType } from 'app/enums/form.eum';
import { FormConfig } from 'app/interfaces/form-screen.interface';

@Component({
  selector: 'app-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() formConfig: FormConfig = {
    formTitle: '',
    isInExpansionTable: false,
    isDynamic: false,
    fields: [],
    proceedText: '',
    canProceed: false,
  };
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formChanged = new EventEmitter<any>();

  fieldType = FormFieldType;
  form = this.fb.group({});
  hiddenFields = {} as { [key: number]: boolean };

  get validForm() {
    let formValid = true;
    Object.keys(this.form.controls).forEach((key, index) => {
      // Complex logic required to test if multi-selector is empty
      if (typeof this.form.controls[key].value === 'object') {
        if (this.form.controls[key].value != null) {
          if (Object.keys(this.form.controls[key].value).length === 0) {
            formValid = false;
          }
        }
      }

      if (
        ![FormFieldType.CHECKBOX, FormFieldType.FIELD_GROUP_TITLE].includes(
          this.formConfig.fields[index]?.fieldType
        )
      ) {
        if (!this.form.controls[key].value) {
          formValid = false;
        }
      }
    });
    // canProceed allows the parent to over-ride
    return (formValid && this.form.valid) || this.formConfig.canProceed;
  }

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setForm();
  }

  onSubmit() {
    this.removeFromGroupTitles();
    this.formSubmitted.emit(this.form.value);
  }

  onFormChange() {
    if (this.formConfig.isDynamic) {
      this.formChanged.emit(this.form.value);
      this.setForm();
    }
  }

  toggleField(index: number) {
    this.hiddenFields[index] = !this.hiddenFields[index];
  }

  toggleOptOut(field: string) {
    this.form.controls[field].setValue(!this.form.controls[field].value);
    this.onFormChange();
  }

  private setForm() {
    this.addFormFields();
    this.removeFormFields();
    this.cd.detectChanges();
  }

  private addFormFields() {
    this.formConfig.fields.forEach((field, fieldIndex) => {
      this.form.addControl(
        field.fieldName,
        new FormControl(field.defaultValue, Validators.required)
      );
      this.form.controls[field.fieldName].setValidators([Validators.required]);
      this.form.controls[field.fieldName].setValidators([Validators.min(1)]);
      if (field.fieldType === FormFieldType.PASSWORD) {
        this.hiddenFields[fieldIndex] = true;
      }
    });
  }

  private removeFormFields() {
    let listOfFieldNames: string[] = [];
    this.formConfig.fields.forEach((field) => {
      listOfFieldNames.push(field.fieldName);
    });

    Object.keys(this.form.controls).forEach((key) => {
      if (!listOfFieldNames.includes(key)) {
        this.form.removeControl(key);
      }
    });
  }

  private removeFromGroupTitles() {
    let listOfFormGroupTitles: string[] = [];
    this.formConfig.fields.forEach((field) => {
      if (field.fieldType === FormFieldType.FIELD_GROUP_TITLE) {
        listOfFormGroupTitles.push(field.fieldName);
      }
    });

    Object.keys(this.form.controls).forEach((key) => {
      if (listOfFormGroupTitles.includes(key)) {
        this.form.removeControl(key);
      }
    });
  }
}
