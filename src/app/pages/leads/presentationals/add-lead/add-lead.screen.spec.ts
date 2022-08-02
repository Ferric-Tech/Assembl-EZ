import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeadScreen } from './add-lead.screen';

describe('AddLeadComponent', () => {
  let component: AddLeadScreen;
  let fixture: ComponentFixture<AddLeadScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLeadScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeadScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
