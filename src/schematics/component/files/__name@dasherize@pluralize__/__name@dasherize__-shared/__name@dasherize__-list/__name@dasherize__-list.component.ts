import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';

import { <%= classify(name) %> } from 'src/app/commons/models/<%= dasherize(name) %>.model';
import { PAGE_SIZE_OPTIONS } from 'src/app/helpers/table.helper';
import { <%= classify(name) %>Filters } from 'src/app/commons/models/<%= dasherize(name) %>.model';

export type <%= pluralize(classify(name)) %>Column = "id", <% for(let dto of dtos) {%>"<%= camelize(dto.property) %>" | <%}%>"actions";

@Component({
  selector: '<%= dasherize(name) %>-list',
  templateUrl: './<%= dasherize(name) %>-list.component.html',
  styleUrls: ['./<%= dasherize(name) %>-list.component.scss'],
})
export class <%= classify(name) %>ListComponent {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input()
  <%= pluralize(camelize(name)) %>: Observable<<%= classify(name) %>[]>;

  @Input()
  defaultFilters: <%= classify(name) %>Filters;

  pageSizeOptions = PAGE_SIZE_OPTIONS;
  expandedElement: <%= classify(name) %> | null;

  @Input()
  total: Observable<number>;
  @Input()
  displayedColumns: <%= pluralize(classify(name)) %>Column[] = [<% for(let dto of dtos) {%>"<%= camelize(dto.property) %>", <%}%>"actions"];

  @Input()
  canAdd: boolean;
  @Input()
  canEdit: boolean;
  @Input()
  canSelect: boolean;

  @Output()
  onLoad: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onSortChange: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output()
  onPageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output()
  onFilterChange: EventEmitter<<%= classify(name) %>Filters> = new EventEmitter<<%= classify(name) %>Filters>();

  @Output()
  onSelect<%= classify(name) %>: EventEmitter<<%= classify(name) %>> = new EventEmitter<<%= classify(name) %>>();
  @Output()
  onAdd<%= classify(name) %>: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onEdit<%= classify(name) %>: EventEmitter<<%= classify(name) %>> = new EventEmitter<<%= classify(name) %>>();

  constructor() { }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe((sort) => {
      this.onSortChange.emit(sort);
    });
    this.paginator.page.subscribe((pageEvent) => {
      this.onPageChange.emit(pageEvent);
    });
  }

  add<%= classify(name) %>() {
    this.onAdd<%= classify(name) %>.emit();
  }

  edit<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>) {
    this.onEdit<%= classify(name) %>.emit(<%= camelize(name) %>);
  }

  select<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>) {
    this.onSelect<%= classify(name) %>.emit(<%= camelize(name) %>);
  }

  onFilter(filters: <%= classify(name) %>Filters) {
    this.paginator.firstPage();
    this.onFilterChange.emit(filters);
  }
}
