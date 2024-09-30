import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackLineComponent } from './black-line.component';

describe('BlackLineComponent', () => {
  let component: BlackLineComponent;
  let fixture: ComponentFixture<BlackLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
