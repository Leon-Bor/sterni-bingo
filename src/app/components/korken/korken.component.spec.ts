import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorkenComponent } from './korken.component';

describe('KorkenComponent', () => {
  let component: KorkenComponent;
  let fixture: ComponentFixture<KorkenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorkenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorkenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
