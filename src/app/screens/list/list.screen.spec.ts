import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScreen } from './list.screen';

describe('ListComponent', () => {
  let component: ListScreen;
  let fixture: ComponentFixture<ListScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
