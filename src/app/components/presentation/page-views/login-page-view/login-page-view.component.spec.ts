import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageViewComponent } from './login-page-view.component';

describe('LoginPageViewComponent', () => {
  let component: LoginPageViewComponent;
  let fixture: ComponentFixture<LoginPageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
