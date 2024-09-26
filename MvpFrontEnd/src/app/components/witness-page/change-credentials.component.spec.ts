import { ComponentFixture, TestBed } from '@angular/core/testing';

import { changeCredentialsComponent } from './change-credentials.component';

describe('WitnessPageComponent', () => {
  let component: changeCredentialsComponent;
  let fixture: ComponentFixture<changeCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ changeCredentialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(changeCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
