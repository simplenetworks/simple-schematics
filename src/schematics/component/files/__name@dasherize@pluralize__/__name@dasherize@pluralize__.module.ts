import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { <%= pluralize(classify(name)) %>Component } from './<%= pluralize(dasherize(name)) %>.component';
import { <%= pluralize(classify(name)) %>RoutingModule } from './<%= pluralize(dasherize(name)) %>-routing.module';
import { <%= classify(name) %>SharedModule } from './<%= dasherize(name) %>-shared/<%= dasherize(name) %>-shared.module';
import { <%= classify(name) %>Effects } from 'src/app/store/effects/<%= dasherize(name) %>.effect';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@NgModule({
  declarations: [<%= pluralize(classify(name)) %>Component],
  imports: [
    SharedModule,
    <%= classify(name) %>SharedModule,
    <%= pluralize(classify(name)) %>RoutingModule,
    EffectsModule.forFeature([
      <%= classify(name) %>Effects
    ]),
    NgxMaterialTimepickerModule.setLocale('it-IT')
  ]
})
export class <%= pluralize(classify(name)) %>Module { }
