import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceInputsPage } from './price-inputs.page';

describe('PriceInputsComponent', () => {
  let component: PriceInputsPage;
  let fixture: ComponentFixture<PriceInputsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceInputsPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceInputsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
