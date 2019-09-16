import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const modules = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules]
})
export class MaterialModule {}
