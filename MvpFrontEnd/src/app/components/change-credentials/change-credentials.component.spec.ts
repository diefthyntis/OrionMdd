import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCredentialsComponent } from './change-credentials.component';

describe('WitnessPageComponent', () => {
  let component: ChangeCredentialsComponent;
  let fixture: ComponentFixture<ChangeCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCredentialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
