import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteBlogsComponent } from './write-blogs.component';

describe('WriteBlogsComponent', () => {
  let component: WriteBlogsComponent;
  let fixture: ComponentFixture<WriteBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteBlogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
