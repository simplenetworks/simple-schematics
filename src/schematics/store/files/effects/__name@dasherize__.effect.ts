import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { <%= classify(name) %>EditComponent } from 'src/app/modules/home/<%= pluralize(dasherize(name)) %>/<%= dasherize(name) %>-shared/<%= dasherize(name) %>-edit/<%= dasherize(name) %>-edit.component';
import { <%= classify(name) %>SelectionComponent } from 'src/app/modules/home/<%= pluralize(dasherize(name)) %>/<%= dasherize(name) %>-shared/<%= dasherize(name) %>-selection/<%= dasherize(name) %>-selection.component';
import { AlertService } from 'src/app/commons/services/alert.service';
import { Laravel<%= classify(name) %>Service } from 'src/app/commons/services/backend/laravel-<%= dasherize(name) %>.service';
import * as <%= classify(name) %>Actions from 'src/app/store/actions/<%= dasherize(name) %>.actions';
import * as <%= classify(name) %>Selectors from 'src/app/store/selectors/<%= dasherize(name) %>.selectors';
import { AppState } from 'src/app/store/reducers';

@Injectable()
export class <%= classify(name) %>Effects {
  error$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.save<%= classify(name) %>Failed, <%= classify(name) %>Actions.delete<%= classify(name) %>Failed),
      tap(({ error }) => {
        if (error) {
          this.alertService.showErrorMessage('Errore', error);
        }
      })
    ), { dispatch: false }
  );

  load<%= pluralize(classify(name)) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.load<%= pluralize(classify(name)) %>),
      switchMap(({ page, perPage, order, direction, filters, includes }) => {
        return this.<%= camelize(name) %>Service.list(page, perPage, order, direction, filters, includes)
          .pipe(
            map(result =>
              <%= classify(name) %>Actions.load<%= pluralize(classify(name)) %>Completed({ <%= pluralize(camelize(name)) %>: result.data, currentPage: page, total: result.total, perPage, order, direction, filters, includes })
            ),
            catchError(error => {
              return of(<%= classify(name) %>Actions.load<%= pluralize(classify(name)) %>Failed({ error }))
            })
          )
      })
    )
  );

  changePage = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.changePage),
      withLatestFrom(this.store$.select(<%= classify(name) %>Selectors.get<%= pluralize(classify(name)) %>TableState)),
      map(([{ page, size }, { total, currentPage, perPage, direction, order, filters, includes }]) => <%= classify(name) %>Actions.load<%= pluralize(classify(name)) %>({ page: page, perPage: size, order, direction, filters, includes }))
    )
  );

  changeSort = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.changeSort),
      withLatestFrom(this.store$.select(<%= classify(name) %>Selectors.get<%= pluralize(classify(name)) %>TableState)),
      map(([action, { total, currentPage, perPage, direction, order, filters, includes }]) => <%= classify(name) %>Actions.load<%= pluralize(classify(name)) %>({ page: currentPage, perPage: perPage, order: action.order, direction: action.direction, filters, includes }))
    )
  );

  changeFilters = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.changeFilters),
      withLatestFrom(this.store$.select(<%= classify(name) %>Selectors.get<%= pluralize(classify(name)) %>TableState)),
      map(([{ filters }, { total, currentPage, perPage, direction, order, includes }]) => <%= classify(name) %>Actions.load<%= pluralize(classify(name)) %>({ page: currentPage, perPage: perPage, order, direction, filters, includes }))
    )
  );

  edit<%= classify(name) %>$ = createEffect(() => this.actions$.pipe(
    ofType(<%= classify(name) %>Actions.edit<%= classify(name) %>),
    map(({ <%= camelize(name) %> }) => {
      let dialogRef = this.dialog.open(<%= classify(name) %>EditComponent, {
        data: {
          <%= camelize(name) %>
        }
      });
      return <%= classify(name) %>Actions.<%= camelize(name) %>DialogOpened({ dialogId: dialogRef.id });
    }))
  );

  save<%= classify(name) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.save<%= classify(name) %>),
      switchMap(({ <%= camelize(name) %> }) =>
        this.<%= camelize(name) %>Service.upsert(<%= camelize(name) %>.toDTO())
          .pipe(
            map(result =>
              <%= classify(name) %>Actions.save<%= classify(name) %>Completed({ <%= camelize(name) %>: result })
            ),
            catchError(error => of(<%= classify(name) %>Actions.save<%= classify(name) %>Failed({ error })))
          )
      )
    )
  );

  onSaveCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.save<%= classify(name) %>Completed),
      map(action => action.<%= camelize(name) %>),
      tap(<%= camelize(name) %> => this.alertService.showConfirmMessage(`${<%= camelize(name) %>.id} salvato con successo`)),
      map(() => <%= classify(name) %>Actions.close<%= classify(name) %>Dialog())
    )
  );


  delete<%= classify(name) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.delete<%= classify(name) %>),
      switchMap(({ <%= camelize(name) %> }) =>
        this.alertService.showConfirmDialog('Conferma eliminazione', `Sei sicuro di voler eliminare ${<%= camelize(name) %>.id}?`)
          .pipe(
            switchMap((confirm) => {
              return confirm ?
                this.<%= camelize(name) %>Service.delete(<%= camelize(name) %>.id)
                  .pipe(
                    map(() => <%= classify(name) %>Actions.delete<%= classify(name) %>Completed({ <%= camelize(name) %> })),
                    catchError(error => of(<%= classify(name) %>Actions.delete<%= classify(name) %>Failed({ error })))
                  )
                : of(<%= classify(name) %>Actions.delete<%= classify(name) %>Cancelled());
            })
          )
      )
    )
  );

  onDeleteCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.delete<%= classify(name) %>Completed),
      tap(({ <%= camelize(name) %> }) => this.alertService.showConfirmMessage(` ${<%= camelize(name) %>.id} eliminato con successo`)),
      map(() => <%= classify(name) %>Actions.close<%= classify(name) %>Dialog())
    )
  );


  closeDialog = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.close<%= classify(name) %>Dialog),
      withLatestFrom(this.store$.select(<%= classify(name) %>Selectors.get<%= classify(name) %>DialogId)),
      tap(([_, dialogId]) => {
        if (dialogId) {
          this.dialog.getDialogById(dialogId).close();
        }
      })
    ), { dispatch: false }
  );

  reloadAfterSave = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.save<%= classify(name) %>Completed),
      withLatestFrom(this.store$.select(<%= classify(name) %>Selectors.get<%= pluralize(classify(name)) %>TableState)),
      map(([_, { currentPage, perPage, direction, order, filters, includes }]) => <%= classify(name) %>Actions.load<%= pluralize(classify(name)) %>({ page: currentPage, perPage, order, direction, filters, includes }))
    )
  );

  reloadAfterDelete = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.delete<%= classify(name) %>Completed),
      withLatestFrom(this.store$.select(<%= classify(name) %>Selectors.get<%= pluralize(classify(name)) %>TableState)),
      map(([_, { currentPage, perPage, direction, order, filters, includes }]) => <%= classify(name) %>Actions.load<%= pluralize(classify(name)) %>({ page: currentPage, perPage, order, direction, filters, includes }))
    )
  );

  select<%= classify(name) %>$ = createEffect(() => this.actions$.pipe(
    ofType(<%= classify(name) %>Actions.select<%= classify(name) %>),
    map(({ filters }) => {
      let dialogRef = this.dialog.open(<%= classify(name) %>SelectionComponent, {
        data: {
          defaultFilters: filters
        }
      });
      return <%= classify(name) %>Actions.selectionDialogOpened({ selectionDialogId: dialogRef.id });
    }))
  );

  closeSelectionDialog = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.closeSelectionDialog),
      withLatestFrom(this.store$.select(<%= classify(name) %>Selectors.getSelectionDialogId)),
      tap(([_, dialogId]) => {
        if (dialogId) {
          this.dialog.getDialogById(dialogId).close();
        }

      })
    ), { dispatch: false }
  );

  <%= pluralize(camelize(name)) %>Selected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.<%= camelize(name) %>Selected),
      map(() => <%= classify(name) %>Actions.closeSelectionDialog())
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private <%= camelize(name) %>Service: Laravel<%= classify(name) %>Service,
    private dialog: MatDialog,
    private alertService: AlertService
  ) { }
}
