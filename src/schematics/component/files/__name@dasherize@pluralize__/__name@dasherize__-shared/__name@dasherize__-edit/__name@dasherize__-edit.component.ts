import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { <%= classify(name) %> } from 'src/app/commons/models/<%= dasherize(name) %>.model';
import { AlertService } from 'src/app/commons/services/alert.service';
import * as <%= classify(name) %>Actions from 'src/app/store/actions/<%= dasherize(name) %>.actions';
import { AppState } from 'src/app/store/reducers';

<% for(let dto of dtos) {%><% if(dto.type.endsWith("DTO") || dto.type.endsWith("DTO[]") ) { %>import { <%= dto.type.replace("DTO", "").replace("[]", "") %> } from 'src/app/commons/models/<%= dasherize(dto.type.replace("DTO", "").replace("[]", "")) %>.model';<% } %>
<% } %>

@Component({
  selector: 'app-<%= dasherize(name) %>-edit',
  templateUrl: './<%= dasherize(name) %>-edit.component.html',
  styleUrls: ['./<%= dasherize(name) %>-edit.component.scss']
})
export class <%= classify(name) %>EditComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  private _<%= camelize(name) %>: <%= classify(name) %>;

  current<%= classify(name) %>: <%= classify(name) %>;

  <%= camelize(name) %>Form = this.fb.group({
    <% for(let dto of dtos) {%><%= camelize(dto.property) %>: new FormControl<<%= dto.classType %>>(null<% if(!dto.nullable) {%>, { validators: [Validators.required] }<% } %>),
    <% } %>
  });

  constructor(private store$: Store<AppState>, private alertService: AlertService, private fb: FormBuilder, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data) {
      this.<%= camelize(name) %> = this.data.<%= camelize(name) %>;
    }
    this.ngOnChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private ngOnChanges() {
    if (this.<%= camelize(name) %>Form) {
      this.<%= camelize(name) %>Form.reset();
      if (this.<%= camelize(name) %>) {
        this._initFormValues(this.<%= camelize(name) %>);
      }
    }
  }

  private _initFormValues(<%= camelize(name) %>: <%= classify(name) %>) {
    if (<%= camelize(name) %>) {
      this.<%= camelize(name) %>Form.patchValue({
        <% for(let dto of dtos) {%><%= camelize(dto.property) %>: <%= camelize(name) %>.<%= camelize(dto.property) %>,
        <% } %>
      });
    }
  }

  get <%= camelize(name) %>(): <%= classify(name) %> {
    return this._<%= camelize(name) %>;
  }

  set <%= camelize(name) %>(<%= camelize(name) %>: <%= classify(name) %>) {
    this._<%= camelize(name) %> = <%= camelize(name) %>;
    this.ngOnChanges();
  }

  private _prepareSave<%= classify(name) %>(): <%= classify(name) %> {
    let saving<%= classify(name) %>: <%= classify(name) %> = <%= classify(name) %>.fromFormGroup(this.<%= camelize(name) %>Form, this.<%= camelize(name) %>);
    return saving<%= classify(name) %>;
  }

  save() {
    let unsavedEntity = this._prepareSave<%= classify(name) %>();
    this.store$.dispatch(<%= classify(name) %>Actions.save<%= classify(name) %>({ <%= camelize(name) %>: unsavedEntity }));
  }

  close() {
    if (this.<%= camelize(name) %>Form.pristine) {
      this.store$.dispatch(<%= classify(name) %>Actions.close<%= classify(name) %>Dialog())
    } else {
      this.alertService
        .showConfirmDialog(
          "Chiudi",
          "Ci sono modifiche non salvate. Sei sicuro di voler chiudere?"
        )
        .subscribe(result => {
          if (result) {
            this.store$.dispatch(<%= classify(name) %>Actions.close<%= classify(name) %>Dialog())
          }
        });
    }
  }

  delete<%= classify(name) %>() {
    if (this.<%= camelize(name) %>) {
      this.store$.dispatch(<%= classify(name) %>Actions.delete<%= classify(name) %>({ <%= camelize(name) %>: this.<%= camelize(name) %>.toDTO() }))
    }
  }

  revert() {
    this.ngOnChanges();
  }
}
