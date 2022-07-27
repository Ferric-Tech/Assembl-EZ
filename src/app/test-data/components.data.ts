export interface ComponentGroup {
  [key: string]: ComponentItem[];
}

export interface ComponentItem {
  name: string;
  display: string;
  value: number;
  incVAT: boolean;
}

export const TestComponentList: ComponentGroup = {
  Aluminium: [
    {
      name: 'lourvePanel',
      display: 'Lourve Panel',
      value: 82.8,
      incVAT: false,
    },
    {
      name: 'lourveCarrier',
      display: 'Lourve Carrier',
      value: 460,
      incVAT: false,
    },
    {
      name: 'lourveBeam',
      display: 'Lourve Beam',
      value: 1300,
      incVAT: false,
    },
    {
      name: 'ibrSheet',
      display: 'IBR Sheet',
      value: 241.5,
      incVAT: false,
    },
    {
      name: 'ibrBeam',
      display: 'IBR Beam',
      value: 1300,
      incVAT: false,
    },
    {
      name: 'gutter',
      display: 'Gutter',
      value: 175.95,
      incVAT: false,
    },
  ],
  Chromedek: [
    {
      name: 'lourvePanel',
      display: 'Lourve Panel',
      value: 66.57,
      incVAT: false,
    },
    {
      name: 'lourveCarrier',
      display: 'Lourve Carrier',
      value: 460,
      incVAT: false,
    },
    {
      name: 'lourveBeam',
      display: 'Lourve Beam',
      value: 1500,
      incVAT: false,
    },
    {
      name: 'ibrSheet',
      display: 'IBR Sheet',
      value: 170,
      incVAT: false,
    },
    {
      name: 'ibrBeam',
      display: 'IBR Beam',
      value: 1500,
      incVAT: false,
    },
    {
      name: 'gutter',
      display: 'Gutter',
      value: 137.31,
      incVAT: false,
    },
  ],
  Gearboxes: [
    {
      name: 'gearbox',
      display: 'Gearbox',
      value: 351.21,
      incVAT: false,
    },
    {
      name: 'crankHandle',
      display: 'Crank handle',
      value: 141.45,
      incVAT: false,
    },
  ],
  Labour: [
    {
      name: 'labourMinimum',
      display: 'Labour minimum',
      value: 1500,
      incVAT: false,
    },
    {
      name: 'labourHourRate',
      display: 'Labour hourly rate',
      value: 180,
      incVAT: false,
    },
  ],
};
