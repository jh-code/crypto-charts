import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AVAILABLE_EXCHANGES } from '../../app.constants';
import { Store, Select } from '@ngxs/store';
import { FetchProducts, SubscribeProduct, FetchProductTicker, FetchProductTrades, CloseSocket } from '../../actions/trade.actions';
import { TradeState } from '../../state/trade.state';
import { Observable } from 'rxjs';
import { CoinbaseProProduct } from '../../models/coinbase-pro';
import { MatSelectChange } from '@angular/material';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  // TODO: change this to support other exchanges...
  public exchanges: string[] = AVAILABLE_EXCHANGES;
  public selectedExchange = 'Coinbase Pro'; // TODO: support more exchanges
  public selectedProduct;

  public chartColorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  @Select(TradeState.products) products$: Observable<CoinbaseProProduct[]>;
  @Select(TradeState.current) current$: Observable<CoinbaseProProduct>;
  @Select(TradeState.price) price$: Observable<string>;
  @Select(TradeState.trades) trades$: Observable<string>;
  @Select(TradeState.chartTrades) chartTrades$: Observable<string>;

  constructor(
    private store: Store
  ) { }

  public ngOnInit(): void {
    this.store.dispatch([
      new FetchProducts()
    ]);
  }

  public _selectProduct(event: MatSelectChange): void {
    // this.store.dispatch(new SubscribeProduct(event.value));
    this.store.dispatch([
      new FetchProductTicker(event.value),
      new FetchProductTrades(event.value),
      new SubscribeProduct(event.value)
    ]);
  }

  public ngOnDestroy(): void {

  }

  public closeSocket(): void {
    this.store.dispatch(new CloseSocket);
  }

}
