export enum ProductUnitType {
  WIDTH_PROJECTION,
}

export enum ComponentDependencyType {
  WIDTH,
  PROJECTION,
  AREA,
  PERIMETER,
}

export enum ComponentRuleType {
  CONDITION,
  FORMULA,
  VALUE,
}

export enum ComparisionType {
  LESS_THAN,
  LESS_OR_EQUAL_TO,
  EQUAL_TO,
  GREATER_OR_EQUAL_TO,
  GREATER_THAN,
}

export enum ConditionBinder {
  NONE,
  AND,
  OR,
}

export enum FormulaOpertor {
  ADD,
  MINUS,
  MULTIPLY_BY,
  DIVIDE_BY,
}

export enum Rounding {
  NONE,
  ROUND,
  ROUND_UP,
  ROUND_DOWN,
}

export interface ComponentRef {
  componentGroup: string;
  componentName: string;
}

export interface ComponentRuleCondition {
  test: ComponentRuleConditionTest;
  ifTrue: ComponentRuleCondition | ComponentRuleFormula | number;
  ifFalse:
    | ComponentRuleCondition
    | ComponentRuleFormula
    | number
    | ComponentDependencyType;
}

export interface ComponentRuleConditionTest {
  binder: ConditionBinder;
  conditions: RuleCondition[];
}

export interface RuleCondition {
  subject: ComponentDependencyType | ComponentRuleFormula | ComponentRef;
  comparisionType: ComparisionType;
  comparative: ComponentRuleFormula | number;
}

export interface ComponentRuleFormula {
  rounding: Rounding;
  firstNumber:
    | number
    | ComponentDependencyType
    | ComponentRef
    | ComponentRuleFormula;
  operator: FormulaOpertor;
  secondNumber:
    | number
    | ComponentDependencyType
    | ComponentRef
    | ComponentRuleFormula;
}

export interface ProductGroup {
  [key: string]: Product[];
}

export interface Product {
  productName: string;
  productUnitType: ProductUnitType;
  margin: number;
  components: ComponentInput[];
}

export interface ComponentInput {
  component: ComponentRef;
  componentRuleType: ComponentRuleType;
  componentRuleFormula?: ComponentRuleFormula;
  componentRuleCondition?: ComponentRuleCondition;
}

export const TestProductList: ProductGroup = {
  Awnings: [
    {
      productName: 'Aluminium Lourve',
      productUnitType: ProductUnitType.WIDTH_PROJECTION,
      margin: 0.35,
      components: [
        {
          component: {
            componentGroup: 'Aluminium',
            componentName: 'lourvePanel',
          },
          componentRuleType: ComponentRuleType.FORMULA,
          componentRuleFormula: {
            rounding: Rounding.ROUND_UP,
            firstNumber: ComponentDependencyType.AREA,
            operator: FormulaOpertor.MULTIPLY_BY,
            secondNumber: 7.5,
          },
        },
        {
          component: {
            componentGroup: 'Aluminium',
            componentName: 'lourveCarrier',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.NONE,
              conditions: [
                {
                  subject: ComponentDependencyType.WIDTH,
                  comparisionType: ComparisionType.LESS_THAN,
                  comparative: 3000,
                },
              ],
            },
            ifTrue: {
              rounding: Rounding.NONE,
              firstNumber: ComponentDependencyType.PROJECTION,
              operator: FormulaOpertor.DIVIDE_BY,
              secondNumber: 500,
            },
            ifFalse: {
              test: {
                binder: ConditionBinder.NONE,
                conditions: [
                  {
                    subject: ComponentDependencyType.WIDTH,
                    comparisionType: ComparisionType.EQUAL_TO,
                    comparative: 3000,
                  },
                ],
              },
              ifTrue: {
                test: {
                  binder: ConditionBinder.NONE,
                  conditions: [
                    {
                      subject: ComponentDependencyType.PROJECTION,
                      comparisionType: ComparisionType.GREATER_THAN,
                      comparative: 3500,
                    },
                  ],
                },
                ifTrue: {
                  rounding: Rounding.ROUND,
                  firstNumber: ComponentDependencyType.PROJECTION,
                  operator: FormulaOpertor.DIVIDE_BY,
                  secondNumber: 333,
                },
                ifFalse: {
                  rounding: Rounding.ROUND,
                  firstNumber: ComponentDependencyType.PROJECTION,
                  operator: FormulaOpertor.DIVIDE_BY,
                  secondNumber: 500,
                },
              },
              ifFalse: {
                rounding: Rounding.NONE,
                firstNumber: ComponentDependencyType.PROJECTION,
                operator: FormulaOpertor.DIVIDE_BY,
                secondNumber: 333,
              },
            },
          },
        },
        {
          component: {
            componentGroup: 'Aluminium',
            componentName: 'lourveBeam',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.AND,
              conditions: [
                {
                  subject: ComponentDependencyType.WIDTH,
                  comparisionType: ComparisionType.LESS_THAN,
                  comparative: 4500,
                },
                {
                  subject: ComponentDependencyType.PROJECTION,
                  comparisionType: ComparisionType.LESS_THAN,
                  comparative: 3000,
                },
              ],
            },
            ifTrue: 0,
            ifFalse: 1,
          },
        },
        {
          component: {
            componentGroup: 'Aluminium',
            componentName: 'gutter',
          },
          componentRuleType: ComponentRuleType.FORMULA,
          componentRuleFormula: {
            rounding: Rounding.NONE,
            firstNumber: ComponentDependencyType.PERIMETER,
            operator: FormulaOpertor.ADD,
            secondNumber: 0.8,
          },
        },
        {
          component: {
            componentGroup: 'Gearboxes',
            componentName: 'gearbox',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.NONE,
              conditions: [
                {
                  subject: ComponentDependencyType.AREA,
                  comparisionType: ComparisionType.LESS_THAN,
                  comparative: 16,
                },
              ],
            },
            ifTrue: 1,
            ifFalse: 2,
          },
        },
        {
          component: {
            componentGroup: 'Gearboxes',
            componentName: 'crankHandle',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.NONE,
              conditions: [
                {
                  subject: ComponentDependencyType.AREA,
                  comparisionType: ComparisionType.LESS_THAN,
                  comparative: 16,
                },
              ],
            },
            ifTrue: 1,
            ifFalse: 2,
          },
        },
        {
          component: {
            componentGroup: 'Labour',
            componentName: 'labourMinimum',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.NONE,
              conditions: [
                {
                  subject: {
                    componentGroup: 'Labour',
                    componentName: 'labourMinimum',
                  },
                  comparisionType: ComparisionType.GREATER_THAN,
                  comparative: {
                    rounding: Rounding.NONE,
                    firstNumber: {
                      componentGroup: 'Labour',
                      componentName: 'labourHourRate',
                    },
                    operator: FormulaOpertor.MULTIPLY_BY,
                    secondNumber: ComponentDependencyType.AREA,
                  },
                },
              ],
            },
            ifTrue: 1,
            ifFalse: 0,
          },
        },
        {
          component: {
            componentGroup: 'Labour',
            componentName: 'labourHourRate',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.NONE,
              conditions: [
                {
                  subject: {
                    componentGroup: 'Labour',
                    componentName: 'labourMinimum',
                  },
                  comparisionType: ComparisionType.GREATER_THAN,
                  comparative: {
                    rounding: Rounding.NONE,
                    firstNumber: {
                      componentGroup: 'Labour',
                      componentName: 'labourHourRate',
                    },
                    operator: FormulaOpertor.MULTIPLY_BY,
                    secondNumber: ComponentDependencyType.AREA,
                  },
                },
              ],
            },
            ifTrue: 0,
            ifFalse: ComponentDependencyType.AREA,
          },
        },
      ],
    },
    {
      productName: 'Aluminium IBR',
      productUnitType: ProductUnitType.WIDTH_PROJECTION,
      margin: 0.35,
      components: [
        {
          component: {
            componentGroup: 'Aluminium',
            componentName: 'ibrSheet',
          },
          componentRuleType: ComponentRuleType.FORMULA,
          componentRuleFormula: {
            rounding: Rounding.ROUND_UP,
            firstNumber: {
              rounding: Rounding.NONE,
              firstNumber: ComponentDependencyType.WIDTH,
              operator: FormulaOpertor.DIVIDE_BY,
              secondNumber: {
                rounding: Rounding.NONE,
                firstNumber: 2,
                operator: FormulaOpertor.MULTIPLY_BY,
                secondNumber: {
                  rounding: Rounding.NONE,
                  firstNumber: 3,
                  operator: FormulaOpertor.DIVIDE_BY,
                  secondNumber: 1000,
                },
              },
            },
            operator: FormulaOpertor.MULTIPLY_BY,
            secondNumber: {
              rounding: Rounding.NONE,
              firstNumber: ComponentDependencyType.PROJECTION,
              operator: FormulaOpertor.DIVIDE_BY,
              secondNumber: 1000,
            },
          },
        },
        {
          component: {
            componentGroup: 'Aluminium',
            componentName: 'ibrBeam',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.AND,
              conditions: [
                {
                  subject: ComponentDependencyType.WIDTH,
                  comparisionType: ComparisionType.LESS_THAN,
                  comparative: 3000,
                },
                {
                  subject: ComponentDependencyType.PROJECTION,
                  comparisionType: ComparisionType.LESS_THAN,
                  comparative: 4000,
                },
              ],
            },
            ifTrue: 0,
            ifFalse: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    subject: ComponentDependencyType.WIDTH,
                    comparisionType: ComparisionType.LESS_THAN,
                    comparative: 4500,
                  },
                  {
                    subject: ComponentDependencyType.PROJECTION,
                    comparisionType: ComparisionType.LESS_THAN,
                    comparative: 3000,
                  },
                ],
              },
              ifTrue: 0,
              ifFalse: 1,
            },
          },
        },
        {
          component: {
            componentGroup: 'Aluminium',
            componentName: 'gutter',
          },
          componentRuleType: ComponentRuleType.FORMULA,
          componentRuleFormula: {
            rounding: Rounding.NONE,
            firstNumber: ComponentDependencyType.PERIMETER,
            operator: FormulaOpertor.ADD,
            secondNumber: 0.8,
          },
        },
        {
          component: {
            componentGroup: 'Labour',
            componentName: 'labourMinimum',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.NONE,
              conditions: [
                {
                  subject: {
                    componentGroup: 'Labour',
                    componentName: 'labourMinimum',
                  },
                  comparisionType: ComparisionType.GREATER_THAN,
                  comparative: {
                    rounding: Rounding.NONE,
                    firstNumber: {
                      componentGroup: 'Labour',
                      componentName: 'labourHourRate',
                    },
                    operator: FormulaOpertor.MULTIPLY_BY,
                    secondNumber: ComponentDependencyType.AREA,
                  },
                },
              ],
            },
            ifTrue: 1,
            ifFalse: 0,
          },
        },
        {
          component: {
            componentGroup: 'Labour',
            componentName: 'labourHourRate',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.NONE,
              conditions: [
                {
                  subject: {
                    componentGroup: 'Labour',
                    componentName: 'labourMinimum',
                  },
                  comparisionType: ComparisionType.GREATER_THAN,
                  comparative: {
                    rounding: Rounding.NONE,
                    firstNumber: {
                      componentGroup: 'Labour',
                      componentName: 'labourHourRate',
                    },
                    operator: FormulaOpertor.MULTIPLY_BY,
                    secondNumber: ComponentDependencyType.AREA,
                  },
                },
              ],
            },
            ifTrue: 0,
            ifFalse: ComponentDependencyType.AREA,
          },
        },
      ],
    },
    {
      productName: 'Chromedek Lourve',
      productUnitType: ProductUnitType.WIDTH_PROJECTION,
      margin: 0.35,
      components: [
        {
          component: {
            componentGroup: 'Chromedek',
            componentName: 'lourvePanel',
          },
          componentRuleType: ComponentRuleType.FORMULA,
          componentRuleFormula: {
            rounding: Rounding.ROUND_UP,
            firstNumber: ComponentDependencyType.AREA,
            operator: FormulaOpertor.MULTIPLY_BY,
            secondNumber: 7.5,
          },
        },
        {
          component: {
            componentGroup: 'Chromedek',
            componentName: 'lourveCarrier',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.NONE,
              conditions: [
                {
                  subject: ComponentDependencyType.WIDTH,
                  comparisionType: ComparisionType.LESS_THAN,
                  comparative: 3000,
                },
              ],
            },
            ifTrue: {
              rounding: Rounding.NONE,
              firstNumber: ComponentDependencyType.PROJECTION,
              operator: FormulaOpertor.DIVIDE_BY,
              secondNumber: 500,
            },
            ifFalse: {
              test: {
                binder: ConditionBinder.NONE,
                conditions: [
                  {
                    subject: ComponentDependencyType.WIDTH,
                    comparisionType: ComparisionType.EQUAL_TO,
                    comparative: 3000,
                  },
                ],
              },
              ifTrue: {
                test: {
                  binder: ConditionBinder.NONE,
                  conditions: [
                    {
                      subject: ComponentDependencyType.PROJECTION,
                      comparisionType: ComparisionType.GREATER_THAN,
                      comparative: 3500,
                    },
                  ],
                },
                ifTrue: {
                  rounding: Rounding.ROUND,
                  firstNumber: ComponentDependencyType.PROJECTION,
                  operator: FormulaOpertor.DIVIDE_BY,
                  secondNumber: 333,
                },
                ifFalse: {
                  rounding: Rounding.ROUND,
                  firstNumber: ComponentDependencyType.PROJECTION,
                  operator: FormulaOpertor.DIVIDE_BY,
                  secondNumber: 500,
                },
              },
              ifFalse: {
                rounding: Rounding.NONE,
                firstNumber: ComponentDependencyType.PROJECTION,
                operator: FormulaOpertor.DIVIDE_BY,
                secondNumber: 333,
              },
            },
          },
        },
        {
          component: {
            componentGroup: 'Chromedek',
            componentName: 'lourveBeam',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.AND,
              conditions: [
                {
                  subject: ComponentDependencyType.WIDTH,
                  comparisionType: ComparisionType.LESS_THAN,
                  comparative: 4500,
                },
                {
                  subject: ComponentDependencyType.PROJECTION,
                  comparisionType: ComparisionType.LESS_THAN,
                  comparative: 3000,
                },
              ],
            },
            ifTrue: 0,
            ifFalse: 1,
          },
        },
        {
          component: {
            componentGroup: 'Chromedek',
            componentName: 'gutter',
          },
          componentRuleType: ComponentRuleType.FORMULA,
          componentRuleFormula: {
            rounding: Rounding.NONE,
            firstNumber: ComponentDependencyType.PERIMETER,
            operator: FormulaOpertor.ADD,
            secondNumber: 0.8,
          },
        },
        {
          component: {
            componentGroup: 'Gearboxes',
            componentName: 'gearbox',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.NONE,
              conditions: [
                {
                  subject: ComponentDependencyType.AREA,
                  comparisionType: ComparisionType.LESS_THAN,
                  comparative: 16,
                },
              ],
            },
            ifTrue: 1,
            ifFalse: 2,
          },
        },
        {
          component: {
            componentGroup: 'Gearboxes',
            componentName: 'crankHandle',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.NONE,
              conditions: [
                {
                  subject: ComponentDependencyType.AREA,
                  comparisionType: ComparisionType.LESS_THAN,
                  comparative: 16,
                },
              ],
            },
            ifTrue: 1,
            ifFalse: 2,
          },
        },
        {
          component: {
            componentGroup: 'Labour',
            componentName: 'labourMinimum',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.NONE,
              conditions: [
                {
                  subject: {
                    componentGroup: 'Labour',
                    componentName: 'labourMinimum',
                  },
                  comparisionType: ComparisionType.GREATER_THAN,
                  comparative: {
                    rounding: Rounding.NONE,
                    firstNumber: {
                      componentGroup: 'Labour',
                      componentName: 'labourHourRate',
                    },
                    operator: FormulaOpertor.MULTIPLY_BY,
                    secondNumber: ComponentDependencyType.AREA,
                  },
                },
              ],
            },
            ifTrue: 1,
            ifFalse: 0,
          },
        },
        {
          component: {
            componentGroup: 'Labour',
            componentName: 'labourHourRate',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.NONE,
              conditions: [
                {
                  subject: {
                    componentGroup: 'Labour',
                    componentName: 'labourMinimum',
                  },
                  comparisionType: ComparisionType.GREATER_THAN,
                  comparative: {
                    rounding: Rounding.NONE,
                    firstNumber: {
                      componentGroup: 'Labour',
                      componentName: 'labourHourRate',
                    },
                    operator: FormulaOpertor.MULTIPLY_BY,
                    secondNumber: ComponentDependencyType.AREA,
                  },
                },
              ],
            },
            ifTrue: 0,
            ifFalse: ComponentDependencyType.AREA,
          },
        },
      ],
    },
    {
      productName: 'Chromedek IBR',
      productUnitType: ProductUnitType.WIDTH_PROJECTION,
      margin: 0.35,
      components: [
        {
          component: {
            componentGroup: 'Chromedek',
            componentName: 'ibrSheet',
          },
          componentRuleType: ComponentRuleType.FORMULA,
          componentRuleFormula: {
            rounding: Rounding.ROUND_UP,
            firstNumber: {
              rounding: Rounding.NONE,
              firstNumber: ComponentDependencyType.WIDTH,
              operator: FormulaOpertor.DIVIDE_BY,
              secondNumber: {
                rounding: Rounding.NONE,
                firstNumber: 2,
                operator: FormulaOpertor.MULTIPLY_BY,
                secondNumber: {
                  rounding: Rounding.NONE,
                  firstNumber: 3,
                  operator: FormulaOpertor.DIVIDE_BY,
                  secondNumber: 1000,
                },
              },
            },
            operator: FormulaOpertor.MULTIPLY_BY,
            secondNumber: {
              rounding: Rounding.NONE,
              firstNumber: ComponentDependencyType.PROJECTION,
              operator: FormulaOpertor.DIVIDE_BY,
              secondNumber: 1000,
            },
          },
        },
        {
          component: {
            componentGroup: 'Chromedek',
            componentName: 'ibrBeam',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.AND,
              conditions: [
                {
                  subject: ComponentDependencyType.WIDTH,
                  comparisionType: ComparisionType.LESS_THAN,
                  comparative: 3000,
                },
                {
                  subject: ComponentDependencyType.PROJECTION,
                  comparisionType: ComparisionType.LESS_THAN,
                  comparative: 4000,
                },
              ],
            },
            ifTrue: 0,
            ifFalse: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    subject: ComponentDependencyType.WIDTH,
                    comparisionType: ComparisionType.LESS_THAN,
                    comparative: 4500,
                  },
                  {
                    subject: ComponentDependencyType.PROJECTION,
                    comparisionType: ComparisionType.LESS_THAN,
                    comparative: 3000,
                  },
                ],
              },
              ifTrue: 0,
              ifFalse: 1,
            },
          },
        },
        {
          component: {
            componentGroup: 'Chromedek',
            componentName: 'gutter',
          },
          componentRuleType: ComponentRuleType.FORMULA,
          componentRuleFormula: {
            rounding: Rounding.NONE,
            firstNumber: ComponentDependencyType.PERIMETER,
            operator: FormulaOpertor.ADD,
            secondNumber: 0.8,
          },
        },
        {
          component: {
            componentGroup: 'Labour',
            componentName: 'labourMinimum',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.NONE,
              conditions: [
                {
                  subject: {
                    componentGroup: 'Labour',
                    componentName: 'labourMinimum',
                  },
                  comparisionType: ComparisionType.GREATER_THAN,
                  comparative: {
                    rounding: Rounding.NONE,
                    firstNumber: {
                      componentGroup: 'Labour',
                      componentName: 'labourHourRate',
                    },
                    operator: FormulaOpertor.MULTIPLY_BY,
                    secondNumber: ComponentDependencyType.AREA,
                  },
                },
              ],
            },
            ifTrue: 1,
            ifFalse: 0,
          },
        },
        {
          component: {
            componentGroup: 'Labour',
            componentName: 'labourHourRate',
          },
          componentRuleType: ComponentRuleType.CONDITION,
          componentRuleCondition: {
            test: {
              binder: ConditionBinder.NONE,
              conditions: [
                {
                  subject: {
                    componentGroup: 'Labour',
                    componentName: 'labourMinimum',
                  },
                  comparisionType: ComparisionType.GREATER_THAN,
                  comparative: {
                    rounding: Rounding.NONE,
                    firstNumber: {
                      componentGroup: 'Labour',
                      componentName: 'labourHourRate',
                    },
                    operator: FormulaOpertor.MULTIPLY_BY,
                    secondNumber: ComponentDependencyType.AREA,
                  },
                },
              ],
            },
            ifTrue: 0,
            ifFalse: ComponentDependencyType.AREA,
          },
        },
      ],
    },
  ],
};
