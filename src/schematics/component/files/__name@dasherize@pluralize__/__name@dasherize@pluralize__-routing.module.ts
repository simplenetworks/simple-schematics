import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { <%= pluralize(classify(name)) %>Component } from './<%= pluralize(dasherize(name)) %>.component';

const routes: Routes = [
  {
    path: "",
    component: <%= pluralize(classify(name)) %>Component,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%= pluralize(classify(name)) %>RoutingModule { }
