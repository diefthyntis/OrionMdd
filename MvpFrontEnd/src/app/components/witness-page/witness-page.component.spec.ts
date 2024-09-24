import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitnessPageComponent } from './witness-page.component';

describe('WitnessPageComponent', () => {
  let component: WitnessPageComponent;
  let fixture: ComponentFixture<WitnessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WitnessPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WitnessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
