import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeListComponent } from './trade-list.component';
import { MatInputModule, MatCardModule, MatDividerModule } from '@angular/material';
import { PriceStringModule } from 'src/app/pipes/price-string.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [TradeListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    PriceStringModule,
    NgxDatatableModule
  ],
  exports: [TradeListComponent]
})
export class TradeListModule { }
