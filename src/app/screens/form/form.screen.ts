import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormFieldType } from 'src/app/enums/form.eum';
import { FormConfig } from 'src/app/interfaces/form-screen.interface';

@Component({
  selector: 'app-form-screen',
  templateUrl: './form.screen.html',
  styleUrls: ['./form.screen.scss'],
})
export class FormScreen implements OnInit {
  @Input() formConfigs: FormConfig[] = [];

  fieldType = FormFieldType;
  form = this.fb.group({});

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.formConfigs.forEach((field) => {
      this.form.addControl(
        field.fieldName,
        new FormControl(field.defaultValue)
      );
    });
    this.cd.detectChanges();
  }
}
