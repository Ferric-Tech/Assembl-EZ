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
    this.setExpansionPanelsConfigs();
  }

  private setExpansionPanelsConfigs() {
    const testData: ComponentGroup = TestComponentList;

    Object.keys(testData).forEach((productGroup) => {
      let fields: string[][] = [];
      testData[productGroup].forEach((product) => {
        fields.push([product.displayGeneral, product.price.toString()]);
      });
      this.expansionPanelConfig.push({
        title: productGroup,
        contentType: ExpansionPanelContentType.LIST,
        listContent: {
          isInExpansionTable: true,
          title: '',
          headers: [
            { content: 'Component', widthFactor: 3 },
            { content: 'Unit price', widthFactor: 2 },
          ],
          lines: fields,
        },
      });
    });
  }
}
