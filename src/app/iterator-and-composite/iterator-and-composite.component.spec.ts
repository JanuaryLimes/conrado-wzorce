import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IteratorAndCompositeComponent } from './iterator-and-composite.component';

describe('IteratorAndCompositeComponent', () => {
  let component: IteratorAndCompositeComponent;
  let fixture: ComponentFixture<IteratorAndCompositeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IteratorAndCompositeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IteratorAndCompositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
