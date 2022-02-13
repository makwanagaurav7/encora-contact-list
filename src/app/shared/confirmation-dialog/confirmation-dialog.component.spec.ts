import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationDialog } from './confirmation-dialog.component';

const dialogMock = {
  close: () => { }
};
describe('ConfirmationDialog', () => {
  let component: ConfirmationDialog;
  let fixture: ComponentFixture<ConfirmationDialog>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, MatDialogModule
      ],
      declarations: [ConfirmationDialog],
      providers: [{
        provide: MatDialogRef,
        useValue: dialogMock
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should close popup when Yes or No button is clicked', () => {
    let spy = spyOn(dialogMock, 'close');
    component.popupButtonClick();
    expect(spy).toHaveBeenCalled();
  });
});
