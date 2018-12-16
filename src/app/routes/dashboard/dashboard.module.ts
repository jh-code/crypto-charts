import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatTooltipModule, MatProgressSpinnerModule, MatDividerModule, MatButtonModule } from '@angular/material';
import { NgxsModule } from '@ngxs/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { TradeState } from '../../state/trade.state';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TradeListModule } from '../../components/trade-list/trade-list.module';
import { PriceStringModule } from 'src/app/pipes/price-string.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    NgxsModule.forFeature([TradeState]),
    MatSelectModule,
    MatTooltipModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgxDatatableModule,
    NgxChartsModule,
    TradeListModule,
    PriceStringModule
  ]
})
export class DashboardModule { }
