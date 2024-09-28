import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentTitleComponent } from './comment-title.component';

describe('CommentTitleComponent', () => {
  let component: CommentTitleComponent;
  let fixture: ComponentFixture<CommentTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
