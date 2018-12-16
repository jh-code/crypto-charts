import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CoinbaseProProduct, CoinbaseProTrade, CoinbaseProTicker } from '../models/coinbase-pro';
import { tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AddTrade, UpdatePrice } from '../actions/trade.actions';

@Injectable()
export class CoinbaseProService {
  private socket: WebSocket;

  private apiUrl = 'https://api.pro.coinbase.com';
  private socketUrl = 'wss://ws-feed.pro.coinbase.com';

  private subscribeProduct: string;

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  private _onOpen = (event: Event): void => {
    console.log('++ Socket open', event);
    this.subscribeToProduct(this.subscribeProduct);

    setInterval(() => {
      this.socket.send('{}');
    }, 30000);
  }

  private _onError = (event: Event): void => {
    console.log('++ Socket error', event);
  }

  private _onClose = (event: CloseEvent): void => {
    console.log('++ Socket close', event);
  }

  private _onMessage = (message: MessageEvent): void => {
    const data = JSON.parse(message.data);

    switch (data.type) {
      case 'subscriptions':
        // do something?
        break;
      case 'ticker':
        if (data.trade_id) {
          console.log('+++', data);
          const { price, side, last_size, time, trade_id } = data;
          const newTrade: CoinbaseProTrade = { price, side, size: last_size, time, trade_id };

          this.store.dispatch([
            new AddTrade(newTrade),
            new UpdatePrice(price)
          ]);
        }
        break;
      default:
      // do nothing
    }
  }

  public connectSocket(productId: string): void {
    this.subscribeProduct = productId;

    if (this.socket) {
      this.unsubscribe();
      this.subscribeToProduct(productId);
    } else {
      this.socket = new WebSocket(this.socketUrl);

      this.socket.addEventListener('open', this._onOpen);
      this.socket.addEventListener('error', this._onError);
      this.socket.addEventListener('close', this._onClose);
      this.socket.addEventListener('message', this._onMessage);
    }
  }

  public closeSocket(): void {
    this.unsubscribe();
    this.socket.close();
    this.socket = null;
  }

  public fetchProducts(): Observable<CoinbaseProProduct[]> {
    return this.http.get(this.apiUrl + '/products') as Observable<CoinbaseProProduct[]>;
  }

  public fetchProductTicker(productId: string): Observable<CoinbaseProTicker> {
    const urlParts = ['products', encodeURIComponent(productId), 'ticker'];
    return this.http.get(this.apiUrl + '/' + urlParts.join('/')) as Observable<CoinbaseProTicker>;
  }

  public fetchProductTrades(productId: string): Observable<CoinbaseProTrade[]> {
    const urlParts = ['products', encodeURIComponent(productId), 'trades'];
    return this.http.get(this.apiUrl + '/' + urlParts.join('/')) as Observable<CoinbaseProTrade[]>;
  }

  private subscribeToProduct(productId: string): void {
    const data = {
      type: 'subscribe',
      product_ids: [productId],
      channels: [{ name: 'ticker' }]
    };

    console.log('++ Subscribing', data);

    this.socket.send(JSON.stringify(data));
  }

  private unsubscribe(): void {
    const data = {
      type: 'unsubscribe',
      channels: [{ name: 'ticker' }]
    };

    this.socket.send(JSON.stringify(data));
  }
}
