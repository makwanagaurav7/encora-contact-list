import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [MatTableModule, MatInputModule, MatIconModule, MatButtonModule, MatDialogModule],
  exports: [MatTableModule, MatInputModule, MatIconModule, MatButtonModule, MatDialogModule]
})
export class MaterialModule { }
