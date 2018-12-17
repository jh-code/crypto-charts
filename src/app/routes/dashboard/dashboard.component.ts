import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AVAILABLE_EXCHANGES } from '../../app.constants';
import { Store, Select } from '@ngxs/store';
import { FetchProducts, SubscribeProduct, FetchProductTicker, FetchProductTrades, CloseSocket } from '../../actions/trade.actions';
import { TradeState } from '../../state/trade.state';
import { Observable, Subscription } from 'rxjs';
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
  private productSub: Subscription;

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

    this.productSub = this.products$
    .subscribe((products: CoinbaseProProduct[]) => {
      if (products.length) {
        this.selectedProduct = products[0];
        this.selectProduct(this.selectedProduct);
      }
    });
  }

  public selectProduct(product: CoinbaseProProduct): void {
    this.store.dispatch([
      new FetchProductTicker(product),
      new FetchProductTrades(product),
      new SubscribeProduct(product)
    ]);
  }

  public ngOnDestroy(): void {
    this.store.dispatch(new CloseSocket());
  }

}
