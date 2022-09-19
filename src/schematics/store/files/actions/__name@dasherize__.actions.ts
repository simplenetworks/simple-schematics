import { createAction, props } from '@ngrx/store';

import { <%= classify(name) %>, <%= classify(name) %>DTO, <%= classify(name) %>Filters } from 'src/app/commons/models/<%= dasherize(name) %>.model';

export const load<%= pluralize(classify(name)) %> = createAction('[<%= pluralize(classify(name)) %>] Load <%= pluralize(classify(name)) %>', props<{ page: number, perPage: number, order?: string, direction?: string, filters?: <%= classify(name) %>Filters, includes?: string[] }>());
export const load<%= pluralize(classify(name)) %>Completed = createAction('[<%= pluralize(classify(name)) %>] Load <%= pluralize(classify(name)) %> Completed', props<{ <%= pluralize(camelize(name)) %>: <%= classify(name) %>DTO[], currentPage: number, total: number, perPage: number, order?: string, direction?: string, filters?: <%= classify(name) %>Filters, includes?: string[] }>());
export const load<%= pluralize(classify(name)) %>Failed = createAction('[<%= pluralize(classify(name)) %>] Load <%= pluralize(classify(name)) %> Failed', props<{ error: any }>());

export const changePage = createAction('[<%= pluralize(classify(name)) %>] Change page', props<{ page: number, size: number }>());
export const changeSort = createAction('[<%= pluralize(classify(name)) %>] Change sort', props<{ order: string, direction: string }>());
export const changeFilters = createAction('[<%= pluralize(classify(name)) %>] Change filters', props<{ filters: <%= classify(name) %>Filters }>());

export const edit<%= classify(name) %> = createAction('[<%= pluralize(classify(name)) %>] Edit <%= camelize(name) %>', props<{ <%= camelize(name) %>: <%= classify(name) %> }>());
export const <%= camelize(name) %>DialogOpened = createAction('[<%= pluralize(classify(name)) %>] Detail dialog opened', props<{ dialogId: string }>());
export const close<%= classify(name) %>Dialog = createAction('[<%= pluralize(classify(name)) %>] Close detail dialog');

export const save<%= classify(name) %> = createAction('[<%= pluralize(classify(name)) %>] Save <%= camelize(name) %>', props<{ <%= camelize(name) %>: <%= classify(name) %> }>());
export const save<%= classify(name) %>Completed = createAction('[<%= pluralize(classify(name)) %>] Save <%= camelize(name) %> completed', props<{ <%= camelize(name) %>: <%= classify(name) %>DTO }>());
export const save<%= classify(name) %>Failed = createAction('[<%= pluralize(classify(name)) %>] Save <%= camelize(name) %> failed', props<{ error: any }>());

export const delete<%= classify(name) %> = createAction('[<%= pluralize(classify(name)) %>] Delete <%= camelize(name) %>', props<{ <%= camelize(name) %>: <%= classify(name) %>DTO }>());
export const delete<%= classify(name) %>Completed = createAction('[<%= pluralize(classify(name)) %>] Delete <%= camelize(name) %> completed', props<{ <%= camelize(name) %>: <%= classify(name) %>DTO }>());
export const delete<%= classify(name) %>Cancelled = createAction('[<%= pluralize(classify(name)) %>] Delete <%= camelize(name) %> cancelled');
export const delete<%= classify(name) %>Failed = createAction('[<%= pluralize(classify(name)) %>] Delete <%= camelize(name) %> failed', props<{ error: any }>());

export const select<%= classify(name) %> = createAction('[<%= pluralize(classify(name)) %>] Select <%= camelize(name) %>', props<{ filters?: <%= classify(name) %>Filters }>());
export const selectionDialogOpened = createAction('[<%= pluralize(classify(name)) %>] Selection dialog opened', props<{ selectionDialogId: string }>());
export const closeSelectionDialog = createAction('[<%= pluralize(classify(name)) %>] Close selection dialog');
export const <%= camelize(name) %>Selected = createAction('[<%= pluralize(classify(name)) %>] <%= classify(name) %> selected', props<{ <%= camelize(name) %>: <%= classify(name) %>DTO }>());
