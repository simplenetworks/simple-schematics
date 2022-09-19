import * as fromRouter from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

<% for(let e of entities) {%>import * as from<%= classify(e) %> from './<%= dasherize(e) %>.reducer';
<% }%>

export interface AppState {
  router: fromRouter.RouterReducerState<any>;
  <% for(let e of entities) {%><%= e %>: from<%= classify(e) %>.<%= classify(e) %>State;
	<% }%>
}

export const reducers: ActionReducerMap<AppState> = {
	router: fromRouter.routerReducer,
  <% for(let e of entities) {%><%= e %>: from<%= classify(e) %>.reducer,
	<% }%>
}

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [
      { auth: ["token"] },
    ],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer, fromAuth.clearState];


export const selectRouter = createFeatureSelector<fromRouter.RouterReducerState>(
  "router"
);
<% for(let e of entities) {%>export const select<%= classify(e) %>State = createFeatureSelector<from<%= classify(e) %>.<%= classify(e) %>State>(
	"<%= e %>"
);<% }%>

const {
  selectQueryParams,
  selectQueryParam,
  selectRouteParams,
  selectRouteParam,
  selectRouteData,
  selectUrl,
} = fromRouter.getSelectors(selectRouter);

export const selectRouteId = selectRouteParam("id");
export const selectStatus = selectQueryParam("status");
