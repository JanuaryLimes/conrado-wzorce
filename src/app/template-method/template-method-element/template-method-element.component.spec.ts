import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateMethodElementComponent } from './template-method-element.component';

describe('TemplateMethodElementComponent', () => {
  let component: TemplateMethodElementComponent;
  let fixture: ComponentFixture<TemplateMethodElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateMethodElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateMethodElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
