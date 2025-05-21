
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormFieldComponent } from './components/form-field/form-field.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { RadioComponent } from './components/radio/radio.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    RadioComponent,
    CheckboxComponent,
    FormFieldComponent,
    DatepickerComponent
  ],
  exports: [
    FormFieldComponent,
    InputComponent,
    SelectComponent,
    RadioComponent,
    CheckboxComponent,
    DatepickerComponent
  ]
})
export class DesignLibModule { }
