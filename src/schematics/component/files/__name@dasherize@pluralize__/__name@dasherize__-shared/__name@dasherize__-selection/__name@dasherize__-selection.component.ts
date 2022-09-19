import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { <%= classify(name) %> } from 'src/app/commons/models/<%= dasherize(name) %>.model';
import { PAGE_SIZE_OPTIONS } from 'src/app/helpers/table.helper';
import * as <%= classify(name) %>Actions from 'src/app/store/actions/<%= dasherize(name) %>.actions';
import { AppState } from 'src/app/store/reducers';
import * as <%= classify(name) %>Selectors from 'src/app/store/selectors/<%= dasherize(name) %>.selectors';
import * as AuthSelectors from 'src/app/store/selectors/auth.selectors';

import { <%= classify(name) %>Filters } from 'src/app/commons/models/<%= dasherize(name) %>.model';
import { <%= pluralize(classify(name)) %>Column } from '../<%= dasherize(name) %>-list/<%= dasherize(name) %>-list.component';


@Component({
  selector: 'app-<%= dasherize(name) %>-selection',
  templateUrl: './<%= dasherize(name) %>-selection.component.html',
  styleUrls: ['./<%= dasherize(name) %>-selection.component.scss']
})
export class <%= classify(name) %>SelectionComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  <%= pluralize(camelize(name)) %>: Observable<<%= classify(name) %>[]>;
  filters: Observable<<%= classify(name) %>Filters>;

  @Input()
  defaultFilters: <%= classify(name) %>Filters;

  displayedColumns: <%= pluralize(classify(name)) %>Column[] = ["id", "actions"];

  pageSizeOptions = PAGE_SIZE_OPTIONS;

  total: Observable<number>;
  constructor(private store$: Store<AppState>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.<%= pluralize(camelize(name)) %> = this.store$.pipe(select(<%= classify(name) %>Selectors.get<%= pluralize(classify(name)) %>), takeUntil(this.unsubscribe$), map(dtos => dtos ? dtos.map(dto => new <%= classify(name) %>(dto)) : null));
    this.total = this.store$.pipe(select(<%= classify(name) %>Selectors.getTotal<%= pluralize(classify(name)) %>), takeUntil(this.unsubscribe$));
    this.filters = this.store$.pipe(select(<%= classify(name) %>Selectors.getFilters), takeUntil(this.unsubscribe$));
    if (data) {
      this.defaultFilters = data.defaultFilters;
    }
  }

  load() {
    this.store$.dispatch(<%= classify(name) %>Actions.load<%= pluralize(classify(name)) %>(
      { page: 1, perPage: this.pageSizeOptions[0], filters: this.defaultFilters }));
  }

  sortChange(sort: Sort) {
    this.store$.dispatch(<%= classify(name) %>Actions.changeSort({ order: sort.active, direction: sort.direction }));
  }

  pageChange(pageEvent: PageEvent) {
    this.store$.dispatch(<%= classify(name) %>Actions.changePage({ page: pageEvent.pageIndex + 1, size: pageEvent.pageSize }))
  }

  filtersChange(filters: <%= classify(name) %>Filters) {
    this.store$.dispatch(<%= classify(name) %>Actions.changeFilters({ filters }));
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  select<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>) {
    if (<%= camelize(name) %>) {
      this.store$.dispatch(<%= classify(name) %>Actions.<%= camelize(name) %>Selected({ <%= camelize(name) %>: <%= camelize(name) %>.toDTO() }));
    }
  }

  close() {
    this.store$.dispatch(<%= classify(name) %>Actions.closeSelectionDialog())
  }
}