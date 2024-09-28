import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTitleComponent } from './title.component';

describe('TitleComponent', () => {
  let component: ArticleTitleComponent;
  let fixture: ComponentFixture<ArticleTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
