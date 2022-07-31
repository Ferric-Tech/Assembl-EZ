import { Component, Input, OnInit } from '@angular/core';
import { ExpansionPanelContentType } from 'src/app/enums/expansion-table.enum';
import { ExpansionPanelConfig } from 'src/app/interfaces/expansion-table.interface';
import { ListConfig } from 'src/app/interfaces/list-screen.interface';
import { QuoteResponse } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-quote-results-screen',
  templateUrl: './quote-results.screen.html',
  styleUrls: ['./quote-results.screen.scss'],
})
export class QuoteResultsScreen implements OnInit {
  @Input() quoteParams: { [key: string]: string } = {};
  @Input() quoteResponse: QuoteResponse | undefined;

  quoteSpecs: ListConfig | undefined;
  expansionPanelConfig: ExpansionPanelConfig[] = [];

  ngOnInit(): void {
    this.setSecondaryDependacies();
    this.setQuoteSpecs();
    this.setExpansionPanelsConfigs();
  }

  private setSecondaryDependacies() {
    let projection = parseInt(this.quoteParams['projection']) / 1000;
    let width = parseInt(this.quoteParams['width']) / 1000;

    this.quoteParams['area'] = (projection * width).toString();
    this.quoteParams['perimeter'] = ((projection + width) * 2).toString();
  }

  private setQuoteSpecs() {
    this.quoteSpecs = {
      isInExpansionTable: false,
      title: 'Quote specs',
      headers: [
        { widthFactor: 4, content: '' },
        { widthFactor: 2, content: '' },
      ],
      lines: [
        ['Width (mm)', this.quoteParams['width']],
        ['Projection (mm)', this.quoteParams['projection']],
        [
          'Area (Sqm)',
          parseInt(this.quoteParams['area']).toFixed(2).toString(),
        ],
        [
          'Perimeter (m)',
          parseInt(this.quoteParams['perimeter']).toFixed(2).toString(),
        ],
      ],
    };
  }

  private setExpansionPanelsConfigs() {
    if (!this.quoteResponse) return;
    this.quoteResponse.quotedProducts.forEach((product) => {
      let listOfComponents: string[][] = [];
      product.components.forEach((component) => {
        listOfComponents.push([
          component.componentName,
          component.componentQuantity.toFixed(2).toString(),
          component.componentTotalPrice.toFixed(2).toString(),
        ]);
      });
      this.expansionPanelConfig.push({
        title: product.productName,
        description: product.price.toFixed(2).toString(),
        contentType: ExpansionPanelContentType.LIST,
        listContent: {
          isInExpansionTable: true,
          title: 'Bill of materials',
          headers: [
            { widthFactor: 9, content: 'Component' },
            { widthFactor: 3, content: 'Qty' },
            { widthFactor: 4, content: 'Total' },
          ],
          lines: listOfComponents,
        },
      });
    });
  }
}
