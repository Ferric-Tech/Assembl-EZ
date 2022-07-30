import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMeasurementsComponent } from './product-measurements.screen';

describe('ProductMeasurementsComponent', () => {
  let component: ProductMeasurementsComponent;
  let fixture: ComponentFixture<ProductMeasurementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductMeasurementsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
