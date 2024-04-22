import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBlogpostsComponent } from './my-blogposts.component';

describe('MyBlogpostsComponent', () => {
  let component: MyBlogpostsComponent;
  let fixture: ComponentFixture<MyBlogpostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBlogpostsComponent]
    });
    fixture = TestBed.createComponent(MyBlogpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
