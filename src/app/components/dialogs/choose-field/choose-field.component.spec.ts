import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFieldComponent } from './choose-field.component';

describe('ChooseFieldComponent', () => {
  let component: ChooseFieldComponent;
  let fixture: ComponentFixture<ChooseFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
