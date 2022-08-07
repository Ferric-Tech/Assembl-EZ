import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAgentScreen } from './new-agent.screen';

describe('NewAgentScreen', () => {
  let component: NewAgentScreen;
  let fixture: ComponentFixture<NewAgentScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAgentScreen],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAgentScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
