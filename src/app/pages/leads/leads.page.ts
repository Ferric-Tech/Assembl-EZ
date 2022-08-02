import { Component } from '@angular/core';
import { FormFieldType } from 'src/app/enums/form.eum';
import { FormConfig } from 'src/app/interfaces/form-screen.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-leads-page',
  templateUrl: './leads.page.html',
  styleUrls: ['./leads.page.scss'],
})
export class LeadsPage {
  productMeasurementFormConfig: FormConfig = {
    formTitle: 'Test leads',
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
    ],
    proceedText: 'Proceed',
  };

  constructor(private http: HttpClient) {}

  onLeadTestSubmitted(formValue: { [key: string]: string }) {
    // Test with DKNQuGGHVGMG5FX1eeqrMp5jZ9P2
    const url = 'https://us-central1-assembl-ez.cloudfunctions.net/addLead';
    const body = formValue;
    const options = {
      headers: this.getHeaders(),
      params: new HttpParams().set('userID', 'DKNQuGGHVGMG5FX1eeqrMp5jZ9P2'),
    };

    this.http.post(url, body, options).subscribe((res) => {
      console.log(res);
    });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
