import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap, map } from 'rxjs/operators';

import {
  FetchProducts, SubscribeProduct, FetchProductTicker, FetchProductTrades, AddTrade, UpdatePrice, CloseSocket
} from '../actions/trade.actions';

import { CoinbaseProService } from '../services/coinbase-pro.service';
import { CoinbaseProProduct, CoinbaseProTrade, CoinbaseProTicker } from '../models/coinbase-pro';

export interface TradeStateModel {
  products: CoinbaseProProduct[];
  current: CoinbaseProProduct;
  price: string;
  trades: CoinbaseProTrade[];
}

@State<TradeStateModel>({
  name: 'trade',
  defaults: {
    current: null,
    price: '',
    trades: [],
    products: []
  }
})
export class TradeState {
  @Selector() static current(state: TradeStateModel): CoinbaseProProduct { return state.current; }
  @Selector() static products(state: TradeStateModel): CoinbaseProProduct[] { return state.products; }
  @Selector() static price(state: TradeStateModel): string { return state.price; }
  @Selector() static trades(state: TradeStateModel): CoinbaseProTrade[] { return state.trades; }

  @Selector() static chartTrades(state: TradeStateModel): any[] {
    const [lastTrade] = state.trades;

    return [
      {
        name: state.current.quote_currency + ' = 1 ' + state.current.base_currency,
        value: parseFloat(state.price).toString()
      },
      {
        name: 'Last Trade Size',
        value: parseFloat(lastTrade.size).toString()
      }
    ];
  }

  constructor(
    private coinbaseProService: CoinbaseProService
  ) { }

  @Action(FetchProducts)
  fetchProducts({ patchState }: StateContext<TradeStateModel>) {
    // TODO: support different exchanges
    return this.coinbaseProService.fetchProducts()
      .pipe(
        map(products => this._sortByPropertyAlphabetical(products, 'id')),
        tap(products => patchState({ products }))
      );
  }

  @Action(FetchProductTicker)
  fetchProductTicker({ patchState, dispatch }: StateContext<TradeStateModel>, { product }: FetchProductTicker) {
    return this.coinbaseProService.fetchProductTicker(product.id)
      .pipe(
        tap(({ price }: CoinbaseProTicker): void => {
          patchState({ current: product, price });
          dispatch(new UpdatePrice(price));
        })
      );
  }

  @Action(FetchProductTrades)
  fetchProductTrades({ patchState }: StateContext<TradeStateModel>, { product }: FetchProductTrades) {
    return this.coinbaseProService.fetchProductTrades(product.id)
      .pipe(
        tap((trades: CoinbaseProTrade[]): void => {
          patchState({ trades });
        })
      );
  }

  @Action(SubscribeProduct)
  subscribeProduct({ patchState }: StateContext<TradeStateModel>, { product }: SubscribeProduct) {
    this.coinbaseProService.connectSocket(product.id);
  }

  @Action(AddTrade)
  addTrade({ patchState, getState }: StateContext<TradeStateModel>, { trade }: AddTrade) {
    const currentTrades = [...getState().trades];

    if (currentTrades.length === 100) {
      currentTrades.pop();
    }

    patchState({ trades: [trade, ...currentTrades] });
  }

  @Action(UpdatePrice)
  updatePrice({ patchState }: StateContext<TradeStateModel>, { price }: UpdatePrice) {
    patchState({ price });
  }

  @Action(CloseSocket)
  closeSocket({ }: StateContext<TradeStateModel>) {
    this.coinbaseProService.closeSocket();
  }

  private _sortByPropertyAlphabetical(array: any, prop: string): any[] {
    return array.sort((a, b) => {
      const aText = a[prop].toUpperCase();
      const bText = b[prop].toUpperCase();
      return (aText < bText) ? -1 : (aText > bText) ? 1 : 0;
    });
  }

}
