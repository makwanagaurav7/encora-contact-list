/**
 * This component is opened as popup to Add new or Edit existing contact
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-add-or-edit-contact',
    templateUrl: './add-or-edit-contact.component.html',
    styleUrls: ['./add-or-edit-contact.component.scss']
})
export class AddOrEditContactComponent implements OnInit {
    // Initialize a formgroup with firstName, lastName and phone form controls
    formGroup: FormGroup = this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
        lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
        phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')])
    });
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<AddOrEditContactComponent>,
        private formBuilder: FormBuilder) { }

    /**
     * Life cycle function calls automatically when popup opens
     */
    ngOnInit() {
        // Check if we have existing contact or not to perform edit functionality
        if (this.data.contact) {
            // Set the incoming firstname to firstName form control
            this.formGroup.controls.firstName.setValue(this.data.contact.firstName);
            // Set the incoming lastname to lastName form control
            this.formGroup.controls.lastName.setValue(this.data.contact.lastName);
            // Set the incoming phone to phone form control
            this.formGroup.controls.phone.setValue(this.data.contact.phone);
        }
    }

    /**
     * Function to call when user clicks on 'Save/Edit' button from UI
     */
    saveNewContact() {
        // Close the popup with the values entered by the user in the input fields
        this.dialogRef.close(this.formGroup.value);
    }

    /**
     * Function to call when user clicks on 'Cancel' button
     */
    cancelClick() {
        // Close the popup with blank value
        this.dialogRef.close('');
    }
}
