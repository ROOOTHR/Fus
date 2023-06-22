import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycommentsComponent } from './mycomments.component';

describe('MycommentsComponent', () => {
  let component: MycommentsComponent;
  let fixture: ComponentFixture<MycommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MycommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
