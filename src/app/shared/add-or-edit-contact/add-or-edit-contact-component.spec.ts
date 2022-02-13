import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AddOrEditContactComponent } from './add-or-edit-contact.component';

const dialogMock = {
    close: () => { }
};
describe('AddOrEditContactComponent', () => {
    let component: AddOrEditContactComponent;
    let fixture: ComponentFixture<AddOrEditContactComponent>;
    let mockData = {
        "firstName": "Amit",
        "lastName": "Roy",
        "phone": "9876543210",
        "id": 1
    };
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, MatDialogModule, ReactiveFormsModule, CommonModule, FormsModule],
            declarations: [AddOrEditContactComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{
                provide: MAT_DIALOG_DATA,
                useValue: mockData
            },
            {
                provide: MatDialogRef,
                useValue: dialogMock
            }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddOrEditContactComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should bind firstName, lastName and phone to UI', () => {
        component.data['contact'] = mockData;
        component.ngOnInit();
        expect(component.formGroup.get('firstName')?.value).toEqual('Amit');
        expect(component.formGroup.get('lastName')?.value).toEqual('Roy');
        expect(component.formGroup.get('phone')?.value).toEqual('9876543210');
    });

    it('should close popup with form values when Add/Edit button is clicked', () => {
        let spy = spyOn(dialogMock, 'close');
        component.formGroup.get('firstName')?.setValue('Gaurav');
        component.formGroup.get('lastName')?.setValue('Makwana');
        component.formGroup.get('phone')?.setValue('9876543210');
        component.saveNewContact();
        expect(spy).toHaveBeenCalled();
    });

    it('should close popup when cancel button is clicked', () => {
        let spy = spyOn(dialogMock, 'close');
        component.cancelClick();
        expect(spy).toHaveBeenCalled();
    });
});
