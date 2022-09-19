import { createSelector } from '@ngrx/store';

import { select<%= pluralize(classify(name)) %>tate } from 'src/app/store/reducers';
import { <%= pluralize(classify(name)) %>tate } from 'src/app/store/reducers/<%= dasherize(name) %>.reducer';

// <%= classify(name) %> Selectors

export const get<%= pluralize(classify(name)) %>TableState = createSelector(
  select<%= pluralize(classify(name)) %>tate,
  (state: <%= pluralize(classify(name)) %>tate) => { return { total: state.total, currentPage: state.currentPage, perPage: state.perPage, order: state.order, direction: state.direction, filters: state.filters, includes: state.includes } }
);

export const get<%= pluralize(classify(name)) %> = createSelector(
  select<%= pluralize(classify(name)) %>tate,
  (state: <%= pluralize(classify(name)) %>tate) => state.list
);

export const getTotal<%= pluralize(classify(name)) %> = createSelector(
  get<%= pluralize(classify(name)) %>TableState,
  (state: <%= pluralize(classify(name)) %>tate) => state.total
);

export const get<%= pluralize(classify(name)) %>CurrentPage = createSelector(
  get<%= pluralize(classify(name)) %>TableState,
  (state: <%= pluralize(classify(name)) %>tate) => state.currentPage
);

export const get<%= pluralize(classify(name)) %>PerPage = createSelector(
  get<%= pluralize(classify(name)) %>TableState,
  (state: <%= pluralize(classify(name)) %>tate) => state.perPage
);

export const get<%= pluralize(classify(name)) %>Order = createSelector(
  get<%= pluralize(classify(name)) %>TableState,
  (state: <%= pluralize(classify(name)) %>tate) => state.order
);

export const get<%= pluralize(classify(name)) %>Direction = createSelector(
  get<%= pluralize(classify(name)) %>TableState,
  (state: <%= pluralize(classify(name)) %>tate) => state.direction
);

export const getFilters = createSelector(
  get<%= pluralize(classify(name)) %>TableState,
  (state: <%= pluralize(classify(name)) %>tate) => state.filters
);

export const get<%= classify(name) %>DialogId = createSelector(
  select<%= pluralize(classify(name)) %>tate,
  (state: <%= pluralize(classify(name)) %>tate) => state.dialogId
);

export const getSelected<%= classify(name) %> = createSelector(
  select<%= pluralize(classify(name)) %>tate,
  (state: <%= pluralize(classify(name)) %>tate) => state.<%= camelize(name) %>
);
export const getSelectionDialogId = createSelector(
  select<%= pluralize(classify(name)) %>tate,
  (state: <%= pluralize(classify(name)) %>tate) => state.selectionDialogId
);
