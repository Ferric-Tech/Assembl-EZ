import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionTableScreen } from './expansion-table.screen';

describe('ExpansionTableComponent', () => {
  let component: ExpansionTableScreen;
  let fixture: ComponentFixture<ExpansionTableScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpansionTableScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionTableScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
