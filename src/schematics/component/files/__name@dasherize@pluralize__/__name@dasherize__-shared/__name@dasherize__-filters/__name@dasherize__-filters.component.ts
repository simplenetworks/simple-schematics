import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { <%= classify(name) %>Filters } from 'src/app/commons/models/<%= dasherize(name) %>.model';
<% for(let filter of filters) {%><% if(filter.type[0].toUpperCase() === filter.type[0] && filter.type !== "Date") { %>import { <%= filter.type %> } from 'src/app/commons/models/<%= dasherize(filter.type) %>.model';
<% } %><% } %>

@Component({
  selector: 'app-<%= dasherize(name) %>-filters',
  templateUrl: './<%= dasherize(name) %>-filters.component.html',
  styleUrls: ['./<%= dasherize(name) %>-filters.component.scss']
})
export class <%= classify(name) %>FiltersComponent {
  @Output()
  onFilter: EventEmitter<Partial<<%= classify(name) %>Filters>> = new EventEmitter();

  private _defaultFilters: Partial<<%= classify(name) %>Filters>;
  filtersForm = this.fb.group({
    <% for(let filter of filters) {%><%= camelize(filter.property) %>: new FormControl<<%= filter.type %>>(null),
    <% } %>
  });

  constructor(private fb: FormBuilder) { }

  applyFilters() {
    this.onFilter.emit(this._get<%= classify(name) %>Filters());
  }

  private _get<%= classify(name) %>Filters(): Partial<<%= classify(name) %>Filters> {
    let filters: Partial<<%= classify(name) %>Filters> = {}
    if (this.filtersForm) {
      const values = this.filtersForm.value;
      <% for(let filter of filters) {%>filters.<%= dasherize(filter.property) %> = values.<%= camelize(filter.property) %>;
      <% } %>
    }
    return filters;
  }

  resetFilters() {
    this.filtersForm.reset();
    this._setDefaultValues();
    this.applyFilters();
  }

  get defaultFilters(): Partial<<%= classify(name) %>Filters> {
    return this._defaultFilters;
  }

  @Input()
  set defaultFilters(defaultFilters: Partial<<%= classify(name) %>Filters>) {
    this._defaultFilters = defaultFilters;
    this._setDefaultValues();
  }

  private _setDefaultValues() {
    if (this.defaultFilters) {
      if (this.filtersForm) {
        this.filtersForm.patchValue({
          <% for(let filter of filters) {%><%= camelize(filter.property) %>: this.defaultFilters.<%= dasherize(filter.property) %>,
          <% } %>
        })
      }
    }
  }
}
