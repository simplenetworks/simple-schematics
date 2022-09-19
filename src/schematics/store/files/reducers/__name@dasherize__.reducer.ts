import { Action, createReducer, on } from '@ngrx/store';

import { <%= classify(name) %>, <%= classify(name) %>DTO } from 'src/app/commons/models/<%= dasherize(name) %>.model';
import * as <%= classify(name) %>Actions from 'src/app/store/actions/<%= dasherize(name) %>.actions';
import { <%= classify(name) %>Filters } from 'src/app/commons/models/<%= dasherize(name) %>.model';

export interface <%= classify(name) %>State {
    list: <%= classify(name) %>DTO[],
    total: number,
    includes: string[],
    currentPage: number,
    perPage: number,
    order: string,
    direction: string,
    filters: <%= classify(name) %>Filters,
    dialogId: string,
    selectionDialogId: string,
    <%= camelize(name) %>: <%= classify(name) %>
};

const initialState: <%= classify(name) %>State = {
    list: [],
    total: 0,
    includes: [],
    currentPage: 1,
    perPage: 25,
    order: null,
    direction: null,
    filters: null,
    dialogId: null,
    selectionDialogId: null,
    <%= camelize(name) %>: null
};

const <%= camelize(name) %>Reducer = createReducer(
    initialState,
    on(<%= classify(name) %>Actions.load<%= pluralize(classify(name)) %>Completed, (state, { <%= pluralize(camelize(name)) %>, currentPage, total, perPage, order, direction, includes }) => {
        return { ...state, list: <%= pluralize(camelize(name)) %>, currentPage, total, perPage, order, direction, includes };
    }),
    on(<%= classify(name) %>Actions.<%= camelize(name) %>DialogOpened, (state, { dialogId }) => {
        return { ...state, dialogId };
    }),
    on(<%= classify(name) %>Actions.changeFilters, (state, { filters }) => {
        return { ...state, currentPage: 1, filters };
    }),
    on(<%= classify(name) %>Actions.selectionDialogOpened, (state, { selectionDialogId }) => {
        return { ...state, selectionDialogId };
    })
);

export function reducer(state: <%= classify(name) %>State | undefined, action: Action) {
    return <%= camelize(name) %>Reducer(state, action);
}

