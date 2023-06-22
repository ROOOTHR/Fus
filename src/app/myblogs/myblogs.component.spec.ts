import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyblogsComponent } from './myblogs.component';

describe('MyblogsComponent', () => {
  let component: MyblogsComponent;
  let fixture: ComponentFixture<MyblogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyblogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyblogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
