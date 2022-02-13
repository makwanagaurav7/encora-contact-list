/**
 * This component is opened as a popup when user clicks on Delete button
 */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialog {
    constructor(private dialogRef: MatDialogRef<ConfirmationDialog>) { }

    /**
     * Function to call when user clicks on 'Yes' or 'No' button from the UI
     * @param buttonClickText - It has two values as follow:-
     * '' -> When user clicks on 'No' button
     * 'yes' -> When user clicks on 'Yes' button
     */
    popupButtonClick(buttonClickText: string = '') {
        // Close the dialog with either '' or 'yes' string
        this.dialogRef.close(buttonClickText);
    }
}
