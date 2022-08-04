import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoooComponent } from './mooo.component';

describe('MoooComponent', () => {
  let component: MoooComponent;
  let fixture: ComponentFixture<MoooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoooComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
