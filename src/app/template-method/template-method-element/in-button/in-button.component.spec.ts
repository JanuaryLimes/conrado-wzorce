import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InButtonComponent } from './in-button.component';

describe('InButtonComponent', () => {
  let component: InButtonComponent;
  let fixture: ComponentFixture<InButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
