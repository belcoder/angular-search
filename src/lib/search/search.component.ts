import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'nika-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public componentId = 'id-' + new Date().getTime().toString();

  @Input() customFirstIco: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Input() isLive: boolean;
  @Input() mb: number;
  @Input() autofocus: boolean;
  @Input() filters: any;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() submitFunc: EventEmitter<any> = new EventEmitter<any>();
  @Output() customFirstFunc: EventEmitter<any> = new EventEmitter<any>();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  // @ts-ignore
  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    if (!Array.isArray(this.filters)) {
      this.filters = [];
    } else {

    }

    if (!this.placeholder) {
      this.placeholder = 'Поиск...';
    }

    if (this.mb === undefined) {
      this.mb = 24;
    }

    if (this.autofocus) {
      setTimeout(() => {
        const elInput = document.getElementById('input-' + this.componentId);
        if (elInput) {
          elInput.focus();
        }
      }, 1000);
    }
  }

  public onChangeValue() {
    this.valueChange.emit(this.value);
  }

  public clear() {
    this.value = '';
    this.onChangeValue();
    this.submit();
  }

  public submit() {
    this.submitFunc.emit();
  }
}
