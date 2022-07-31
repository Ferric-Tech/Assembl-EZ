import { Component } from '@angular/core';
import { ExpansionPanelContentType } from 'src/app/enums/expansion-table.enum';
import { FormFieldType } from 'src/app/enums/form.eum';
import { ExpansionPanelConfig } from 'src/app/interfaces/expansion-table.interface';
import { FormFieldConfig } from 'src/app/interfaces/form-screen.interface';
import {
  MenuOption,
  MenuOptionType,
} from 'src/app/interfaces/menu-screen.interface';
import {
  ComponentGroup,
  TestComponentList,
} from 'src/app/test-data/components.data';

@Component({
  selector: 'app-components-screen',
  templateUrl: './components.screen.html',
  styleUrls: ['./components.screen.scss'],
})
export class ComponentsPage {
  expansionPanelConfig: ExpansionPanelConfig[] = [];
  menuOptions: MenuOption[] = [
    { display: 'Back', optionType: MenuOptionType.URL, link: '' },
  ];

  ngOnInit() {
    const testData: ComponentGroup = TestComponentList;

    Object.keys(testData).forEach((productGroup) => {
      let fields: FormFieldConfig[] = [];
      testData[productGroup].forEach((product) => {
        fields.push({
          fieldDisplay: product.displayGeneral,
          fieldName: product.name,
          fieldType: FormFieldType.INPUT_DECIMAL_NUMBER,
          defaultValue: product.price,
        });
      });
      this.expansionPanelConfig.push({
        title: productGroup,
        contentType: ExpansionPanelContentType.FORM,
        formContent: {
          formTitle: productGroup + ' components',
          isInExpansionTable: true,
          isDynamic: false,
          canProceed: false,
          fields: fields,
          proceedText: 'Save',
        },
      });
    });
  }
}
