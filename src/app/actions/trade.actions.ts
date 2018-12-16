import { CoinbaseProProduct, CoinbaseProTrade } from '../models/coinbase-pro';

export class FetchProducts {
  static readonly type = '[Trade] Fetch Products';
}

export class FetchProductTicker {
  static readonly type = '[Trade] Fetch Product Ticker';
  constructor(public product: CoinbaseProProduct) { }
}

export class FetchProductTrades {
  static readonly type = '[Trade] Fetch Product Trades';
  constructor(public product: CoinbaseProProduct) { }
}

export class SubscribeProduct {
  static readonly type = '[Trade] Subscribe Product';
  constructor(public product: CoinbaseProProduct) { }
}

export class AddTrade {
  static readonly type = '[Trade] Add Trade';
  constructor(public trade: CoinbaseProTrade) { }
}

export class UpdatePrice {
  static readonly type = '[Trade] Update Price';
  constructor(public price: string) { }
}

export class CloseSocket {
  static readonly type = '[Trade] Close Socket';
}
