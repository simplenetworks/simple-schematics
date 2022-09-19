import { coerceBooleanProperty } from "@angular/cdk/coercion";
import {
  Component,
  forwardRef,
  HostBinding,
  Input,
  Optional,
  Self,
} from "@angular/core";
import { AbstractControl, ControlValueAccessor, NgControl } from "@angular/forms";
import { MatFormFieldControl } from "@angular/material/form-field";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { <%= classify(name) %>, <%= classify(name) %>Filters } from "src/app/commons/models/<%= dasherize(name) %>.model";
import * as <%= classify(name) %>Actions from "src/app/store/actions/<%= dasherize(name) %>.actions";
import { AppState } from "src/app/store/reducers";

export const <%= underscore(name).toUpperCase() %>_FIELD_MAT_FORM_FIELD_CONTROL: any = {
  provide: MatFormFieldControl,
  useExisting: forwardRef(() => <%= classify(name) %>FieldComponent),
};

@Component({
  selector: "app-<%= dasherize(name) %>-field",
  templateUrl: "./<%= dasherize(name) %>-field.component.html",
  styleUrls: ["./<%= dasherize(name) %>-field.component.scss"],
  providers: [<%= underscore(name).toUpperCase() %>_FIELD_MAT_FORM_FIELD_CONTROL],
  host: {
    "[class.floating]": "shouldLabelFloat",
    "[id]": "id",
  },
})
export class <%= classify(name) %>FieldComponent
  implements ControlValueAccessor, MatFormFieldControl<<%= classify(name) %>> {
  private unsubscribe$ = new Subject<void>();
  private _value: <%= classify(name) %>;
  private _disabled = false;

  private _required = false;
  errorState: boolean; //TODO
  focused: boolean; //TODO
  controlType?: string = "<%= dasherize(name) %>-selection-field";
  autofilled?: boolean;
  <%= camelize(name) %>AriaDescribedBy?: string;


  @Input()
  <%= camelize(name) %>Filters: <%= classify(name) %>Filters;

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.actions$
      .pipe(
        ofType(<%= classify(name) %>Actions.<%= camelize(name) %>Selected),
        takeUntil(this.unsubscribe$),
        map(({ <%= camelize(name) %> }) => (<%= camelize(name) %> ? new <%= classify(name) %>(<%= camelize(name) %>) : null))
      )
      .subscribe((<%= camelize(name) %>) => (this.value = <%= camelize(name) %>));
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  stateChanges = new Subject<void>();
  id: string;

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  get empty() {
    return !this.value;
  }

  @HostBinding("class.floating")
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get required() {
    return this._required;
  }

  @Input()
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  setDescribedByIds(ids: string[]): void {
    //TODO
  }
  onContainerClick(event: MouseEvent): void {
    if (!this.disabled) {
      if ((event.target as Element).tagName.toLowerCase() != "mat-icon") {
        this.select<%= classify(name) %>();
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.stateChanges.complete();
  }

  select<%= classify(name) %>() {
    this.store$.dispatch(<%= classify(name) %>Actions.select<%= classify(name) %>({ filters: this.<%= camelize(name) %>Filters }));
  }

  clear<%= classify(name) %>() {
    this.value = null;
  }

  set value(value: <%= classify(name) %>) {
    this._value = value;
    this.notifyValueChange();
    this.stateChanges.next();
  }

  get value(): <%= classify(name) %> {
    return this._value;
  }

  onChange: (value) => {};
  onTouched: () => {};

  notifyValueChange(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  writeValue(obj: <%= classify(name) %>): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
