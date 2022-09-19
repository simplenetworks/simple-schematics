import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, forwardRef, HostBinding, Input, OnDestroy, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { <%= classify(name) %>, <%= classify(name) %>Filters } from 'src/app/commons/models/<%= camelize(name) %>.model';

export const <%= pluralize(dasherize(name)).toUpperCase() %>_MAT_FORM_FIELD_CONTROL: any = {
  provide: MatFormFieldControl,
  useExisting: forwardRef(() => <%= pluralize(classify(name)) %>FieldComponent),
};

@Component({
  selector: "app-<%= pluralize(dasherize(name)) %>-field",
  templateUrl: "./<%= pluralize(dasherize(name)) %>-field.component.html",
  styleUrls: ["./<%= pluralize(dasherize(name)) %>-field.component.scss"],
  providers: [<%= pluralize(dasherize(name)).toUpperCase() %>_MAT_FORM_FIELD_CONTROL],
  host: {
    "[class.floating]": "shouldLabelFloat",
    "[id]": "id",
  },
})
export class <%= pluralize(classify(name)) %>FieldComponent
  implements OnDestroy, ControlValueAccessor, MatFormFieldControl<<%= classify(name) %>[]> {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private unsubscribe$ = new Subject<void>();

  private _value: <%= classify(name) %>[] = [];
  private _disabled = false;
  openEdit: boolean;
  current<%= classify(name) %>Index: number;

  private _required = false;

  get errorState(): boolean {
    return !this.ngControl.valid;
  }
  focused: boolean; //TODO
  controlType?: string = "<%= camelize(name) %>-selection-field";
  autofilled?: boolean;
  <%= camelize(name) %>AriaDescribedBy?: string;

  @Input()
  <%= camelize(name) %>Filters: <%= classify(name) %>Filters;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() { }

  get current<%= classify(name) %>(): <%= classify(name) %> {
    if (this.current<%= classify(name) %>Index >= 0)
      return this.value.at(this.current<%= classify(name) %>Index);
    return null;
  }

  open() {
    this.openEdit = true;
  };

  close() {
    this.openEdit = false;
  }

  add<%= classify(name) %>() {
    this.current<%= classify(name) %>Index = -1;
    this.open();
  }

  edit<%= classify(name) %>(index: number) {
    this.current<%= classify(name) %>Index = index;
    this.open();
  }

  save(<%= camelize(name) %>: <%= classify(name) %>) {
    if (this.current<%= classify(name) %>Index >= 0) {
      this._value[this.current<%= classify(name) %>Index] = <%= camelize(name) %>;
      this.current<%= classify(name) %>Index = -1;
    } else {
      this._value.push(<%= camelize(name) %>);
    }

    this.notifyValueChange();
  }

  remove<%= classify(name) %>(index: number) {
    if (this.current<%= classify(name) %>Index === index) {
      this.current<%= classify(name) %>Index = -1;
      this.close();
    }

    this.value.splice(index, 1);
    this.notifyValueChange();
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
    return this._required || this.ngControl?.control?.hasValidator(Validators.required) || false;
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

  }

  onContainerClick(event: MouseEvent): void {

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.stateChanges.complete();
  }

  @Input()
  set value(value: <%= classify(name) %>[]) {
    this._value = value;
    this.notifyValueChange();
    this.stateChanges.next();
  }

  get value(): <%= classify(name) %>[] {
    return this._value;
  }

  onChange: (value) => {};
  onTouched: () => {};

  notifyValueChange(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  writeValue(obj: <%= classify(name) %>[]): void {
    this.value = [];
    if (obj) {
      this.value.push(...obj);
    }
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
