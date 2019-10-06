import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'nika-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public componentId = 'id-' + new Date().getTime().toString();

  @Input() placeholder: string;
  @Input() value: string;
  @Input() isLive: boolean;
  @Input() mb: number;
  @Input() autofocus: boolean;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() submitFunc: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    //
  }

  ngOnInit() {
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
