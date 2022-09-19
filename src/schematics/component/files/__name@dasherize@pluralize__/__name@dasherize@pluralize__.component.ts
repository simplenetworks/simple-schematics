import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { <%= classify(name) %>, <%= classify(name) %>Filters } from 'src/app/commons/models/<%= dasherize(name) %>.model';
import { AppState } from 'src/app/store/reducers';
import * as <%= classify(name) %>Selectors from 'src/app/store/selectors/<%= dasherize(name) %>.selectors';
import { PAGE_SIZE_OPTIONS } from 'src/app/helpers/table.helper';
import * as <%= classify(name) %>Actions from 'src/app/store/actions/<%= dasherize(name) %>.actions';

@Component({
  selector: 'app-<%= pluralize(dasherize(name)) %>',
  templateUrl: './<%= pluralize(dasherize(name)) %>.component.html',
  styleUrls: ['./<%= pluralize(dasherize(name)) %>.component.scss']
})
export class <%= pluralize(classify(name)) %>Component implements OnInit {
  private unsubscribe$ = new Subject<void>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  <%= pluralize(camelize(name)) %>: Observable<<%= classify(name) %>[]>;
  filters: Observable<<%= classify(name) %>Filters>;

  defaultFilters: <%= classify(name) %>Filters;

  pageSizeOptions = PAGE_SIZE_OPTIONS;

  total: Observable<number>;
  private _includes: string[] = [
    <% for(let dto of dtos) { %><% if(dto.type.endsWith("DTO") || dto.type.endsWith("DTO[]")) { %>"<%= dto.property.replace("DTO", "").replace("[]", "") %>"<% } %><% } %>
  ];

  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.<%= pluralize(camelize(name)) %> = this.store$.pipe(select(<%= classify(name) %>Selectors.get<%= pluralize(classify(name)) %>), takeUntil(this.unsubscribe$), map(dtos => dtos ? dtos.map(dto => new <%= classify(name) %>(dto)) : null));
    this.total = this.store$.pipe(select(<%= classify(name) %>Selectors.getTotal<%= pluralize(classify(name)) %>), takeUntil(this.unsubscribe$));
    this.filters = this.store$.pipe(select(<%= classify(name) %>Selectors.getFilters), takeUntil(this.unsubscribe$));

    this.load();
  }

  load() {
    this.store$.dispatch(<%= classify(name) %>Actions.load<%= pluralize(classify(name)) %>(
      { page: 1, perPage: this.pageSizeOptions[0], filters: this.defaultFilters, includes: this._includes }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  add<%= classify(name) %>() {
    this.edit<%= classify(name) %>();
  }

  edit<%= classify(name) %>(<%= camelize(name) %>?: <%= classify(name) %>) {
    this.store$.dispatch(<%= classify(name) %>Actions.edit<%= classify(name) %>({ <%= camelize(name) %> }));
  }
}
