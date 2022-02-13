import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { CommonService } from './services/common.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let commonService: CommonService;
  let mockData: any = [
    {
      "firstName": "Amit",
      "lastName": "Roy",
      "phone": "9876543210",
      "id": 1
    }
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientModule, MatDialogModule,
        MatTableModule, BrowserAnimationsModule, ReactiveFormsModule,
        CommonModule
      ],
      declarations: [AppComponent]      
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    commonService = TestBed.get(CommonService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should get contact list data when page loads', () => {
    let spy = spyOn(commonService, 'getContactList').and.returnValue(of(mockData));
    component.ngOnInit();
    spy.calls.mostRecent().returnValue.subscribe((response) => {
      expect(component.contactList.length).toBeGreaterThan(0);
    });
  });

  it('should new contact gets added when add new button is clicked', () => {
    component.addOrEditClick();
    fixture.detectChanges();
    expect(document.getElementById('add-or-edit-form')).toBeDefined();
  });

  it('should not perform any operation when cancel button is clicked from AddOrEditContactComponent dialog', () => {
    let spyObjectOnDialog = jasmine.createSpyObj({ afterClosed : of(''), close: null });
    let spy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(spyObjectOnDialog);
    component.addOrEditClick();
    expect(spyObjectOnDialog.afterClosed).toHaveBeenCalled();
  });

  it('should add new contact when user successfully adds new contact', () => {
    let spyObjectOnDialog = jasmine.createSpyObj({ afterClosed : of({'firstName': 'Gaurav', 'lastName': 'Makwana', 'phone': '9876543211'}), close: null });
    let spy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(spyObjectOnDialog);
    component.addOrEditClick();
    expect(spyObjectOnDialog.afterClosed).toHaveBeenCalled();
  });

  it('should edit contact when user successfully edits his contact', () => {
    const mockData = {'firstName': 'Gaurav', 'lastName': 'Makwana', 'phone': '9876543211'};
    let spyObjectOnDialog = jasmine.createSpyObj({ afterClosed : of(mockData), close: null });
    let spy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(spyObjectOnDialog);
    component.addOrEditClick(mockData, 0);
    expect(spyObjectOnDialog.afterClosed).toHaveBeenCalled();
  });

  it('should not delete a contact when delete button is clicked with No button', () => {
    let spyObjectOnDialogWithNo = jasmine.createSpyObj({ afterClosed : of(''), close: null });
    let spyWithNo = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(spyObjectOnDialogWithNo);
    component.deleteClick(0);
    expect(spyObjectOnDialogWithNo.afterClosed).toHaveBeenCalled();
  });

  it('should delete a contact when delete button is clicked with Yes button', () => {
    let spyObjectOnDialogWithYes = jasmine.createSpyObj({ afterClosed : of('yes'), close: null });
    let spyWithYes = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(spyObjectOnDialogWithYes);
    component.deleteClick(0);
    expect(spyObjectOnDialogWithYes.afterClosed).toHaveBeenCalled();
  })

  it('should reset data when page destroys', () => {
    component.ngOnDestroy();
    expect(component.contactList).toEqual([]);
  });
});
