import { NgModule } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SharedModule } from 'src/app/modules/shared/shared.module'
import { MatChipsModule } from '@angular/material/chips';

import { <%= classify(name) %>ListComponent } from "./<%= dasherize(name) %>-list/<%= dasherize(name) %>-list.component";
import { <%= classify(name) %>FiltersComponent } from "./<%= dasherize(name) %>-filters/<%= dasherize(name) %>-filters.component";
import { <%= classify(name) %>SelectionComponent } from "./<%= dasherize(name) %>-selection/<%= dasherize(name) %>-selection.component";
import { <%= pluralize(classify(name)) %>FieldComponent } from "./<%= pluralize(dasherize(name)) %>-field/<%= pluralize(dasherize(name)) %>-field.component";
import { <%= classify(name) %>FieldComponent } from "./<%= dasherize(name) %>-field/<%= dasherize(name) %>-field.component";

@NgModule({
  declarations: [
    <%= classify(name) %>ListComponent,
    <%= classify(name) %>FiltersComponent,
    <%= classify(name) %>SelectionComponent,
    <%= classify(name) %>sFieldComponent,
    <%= classify(name) %>FieldComponent
  ],
  imports: [
    SharedModule,
    NgxMaterialTimepickerModule.setLocale('it-IT'),
    MatChipsModule
  ],
  exports: [
    <%= classify(name) %>ListComponent,
    <%= classify(name) %>FiltersComponent,
    <%= classify(name) %>SelectionComponent,
    <%= pluralize(classify(name)) %>FieldComponent,
    <%= classify(name) %>FieldComponent
  ]
})
export class <%= classify(name) %>SharedModule { }
