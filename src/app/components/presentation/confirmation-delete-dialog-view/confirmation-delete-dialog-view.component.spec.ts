import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeleteDialogViewComponent } from './confirmation-delete-dialog-view.component';

describe('ConfirmationDeleteDialogViewComponent', () => {
  let component: ConfirmationDeleteDialogViewComponent;
  let fixture: ComponentFixture<ConfirmationDeleteDialogViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDeleteDialogViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDeleteDialogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
