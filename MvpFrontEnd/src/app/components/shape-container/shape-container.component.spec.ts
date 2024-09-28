import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeContainerComponent } from './shape-container.component';

describe('ShapeContainerComponent', () => {
  let component: ShapeContainerComponent;
  let fixture: ComponentFixture<ShapeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapeContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
