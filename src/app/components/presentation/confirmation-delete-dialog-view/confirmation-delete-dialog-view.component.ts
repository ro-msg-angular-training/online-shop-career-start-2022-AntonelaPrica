import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-confirmation-delete-dialog-view',
  templateUrl: './confirmation-delete-dialog-view.component.html',
  styleUrls: ['./confirmation-delete-dialog-view.component.scss']
})
export class ConfirmationDeleteDialogViewComponent {

  @Output() closeDialogEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmDeletionEvent: EventEmitter<void> = new EventEmitter<void>();
}
