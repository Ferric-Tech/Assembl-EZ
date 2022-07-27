import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormFieldType } from 'src/app/enums/form.eum';
import { FormConfig } from 'src/app/interfaces/form-screen.interface';

@Component({
  selector: 'app-form-screen',
  templateUrl: './form.screen.html',
  styleUrls: ['./form.screen.scss'],
})
export class FormScreen implements OnInit {
  @Input() formConfig: FormConfig = {
    formTitle: '',
    isInExpansionTable: false,
    fields: [],
  };
  @Output() formValues = new EventEmitter<any>();

  fieldType = FormFieldType;
  form = this.fb.group({});

  get validForm() {
    let formValid = true;
    Object.keys(this.form.controls).forEach((key) => {
      if (
        this.form.controls[key].value === 0 ||
        this.form.controls[key].value === null
      ) {
        formValid = false;
      }
    });
    return formValid && this.form.valid;
  }

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.formConfig.fields.forEach((field) => {
      this.form.addControl(
        field.fieldName,
        new FormControl(field.defaultValue, Validators.required)
      );
      this.form.controls[field.fieldName].setValidators([Validators.required]);
      this.form.controls[field.fieldName].setValidators([Validators.min(1)]);
    });
    this.cd.detectChanges();
    console.log(this.form.value);
  }

  onSubmit() {
    this.formValues.emit(this.form.value);
  }
}
