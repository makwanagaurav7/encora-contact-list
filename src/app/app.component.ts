/**
 * This component is responsible to display the contact list on UI
 * Also user can able to Add, Delete or Update any contact
 */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CommonService } from './services/common.service';
import { AddOrEditContactComponent } from './shared/add-or-edit-contact/add-or-edit-contact.component';
import { ConfirmationDialog } from './shared/confirmation-dialog/confirmation-dialog.component';

/**
 * Create a Contact interface as a data model for incoming contact list from API
 */
export interface Contact {
  firstName: string;
  lastName: string;
  phone: string;
  id: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // Declare a mat-table reference to use its properties
  @ViewChild(MatTable) table: MatTable<Contact>;
  // Variable is used to hold the API response getting from the API
  contactList: Contact[] = [];
  // Column list array to display on UI
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phone', 'operations'];
  constructor(private commonService: CommonService,
    private matDialog: MatDialog) { }

  /**
   * Life cycle function calls automatically when page will get load
   * Responsbile to call the API to get the contact list
   */  
  ngOnInit(): void {
    this.commonService.getContactList().subscribe((response) => {
      this.contactList = response;
    });
  }

  /**
   * Function to call when wants to add new contact or edit existing contact
   * @param element - When user wants to edit any contact, element is the object that contains all clicked values
   * @param index  - Index of contact in the contactList variable
   */
  addOrEditClick(element: any = null, index: number = this.contactList.length): void {
    // Open the AddOrEditContactComponent as a popup to Add or Edit any contact
    this.matDialog.open(AddOrEditContactComponent, {
      data: {
        contact: element // Pass element(whole contact) to popup
      }
    }).afterClosed().subscribe((data) => { // Getting the data once the popup gets closed
      // Check if any valid data send back from the popup or not
      if (data) {
        // Add 'id' as a next serial number
        data['id'] = this.contactList.length;
        if (element) {
          // Replace new contact data in the existing contact
          this.contactList[index] = data;
        } else {
          // Add new contact into the list
          this.contactList.push(data);
        }
        // Update the table on UI
        this.table.renderRows();
      }
    });
  }

  /**
   * Function to call when user clicks on Delete button from the UI
   * @param index - Index of contact in the contactList variable
   */
  deleteClick(index: number): void {
    // First open the dialog to ask user, if he wants to delete the contact or not
    this.matDialog.open(ConfirmationDialog).afterClosed().subscribe((data) => {
      // Check if user clicks on 'Yes' button
      if (data) {
        // If user clicks on 'Yes' button, remove the contact from the list
        this.contactList.splice(index, 1);
        // Update the table on UI
        this.table.renderRows();
      }
    });
  }

  /**
   * Life cycle hook function calls automatically when page leaves from the UI
   */
  ngOnDestroy(): void {
    // Reset the contact list variable
    this.contactList = [];
  }
}
