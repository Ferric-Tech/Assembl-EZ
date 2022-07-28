export interface ComponentGroup {
  [key: string]: ComponentItem[];
}

export interface ComponentItem {
  name: string;
  display: string;
  price: number;
  incVAT: boolean;
}

export const TestComponentList: ComponentGroup = {
  Aluminium: [
    {
      name: 'lourvePanel',
      display: 'Lourve Panel',
      price: 82.8,
      incVAT: false,
    },
    {
      name: 'lourveCarrier',
      display: 'Lourve Carrier',
      price: 460,
      incVAT: false,
    },
    {
      name: 'lourveBeam',
      display: 'Lourve Beam',
      price: 1300,
      incVAT: false,
    },
    {
      name: 'ibrSheet',
      display: 'IBR Sheet',
      price: 241.5,
      incVAT: false,
    },
    {
      name: 'ibrBeam',
      display: 'IBR Beam',
      price: 1300,
      incVAT: false,
    },
    {
      name: 'gutter',
      display: 'Gutter',
      price: 175.95,
      incVAT: false,
    },
  ],
  Chromedek: [
    {
      name: 'lourvePanel',
      display: 'Lourve Panel',
      price: 66.57,
      incVAT: false,
    },
    {
      name: 'lourveCarrier',
      display: 'Lourve Carrier',
      price: 460,
      incVAT: false,
    },
    {
      name: 'lourveBeam',
      display: 'Lourve Beam',
      price: 1500,
      incVAT: false,
    },
    {
      name: 'ibrSheet',
      display: 'IBR Sheet',
      price: 170,
      incVAT: false,
    },
    {
      name: 'ibrBeam',
      display: 'IBR Beam',
      price: 1500,
      incVAT: false,
    },
    {
      name: 'gutter',
      display: 'Gutter',
      price: 137.31,
      incVAT: false,
    },
  ],
  Gearboxes: [
    {
      name: 'gearbox',
      display: 'Gearbox',
      price: 351.21,
      incVAT: false,
    },
    {
      name: 'crankHandle',
      display: 'Crank handle',
      price: 141.45,
      incVAT: false,
    },
  ],
  Labour: [
    {
      name: 'labourMinimum',
      display: 'Labour minimum',
      price: 1500,
      incVAT: false,
    },
    {
      name: 'labourHourRate',
      display: 'Labour hourly rate',
      price: 180,
      incVAT: false,
    },
  ],
};
