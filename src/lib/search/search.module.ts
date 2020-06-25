import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatTooltipModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchComponent
  ],
  declarations: [SearchComponent]
})
export class SearchModule {
}
