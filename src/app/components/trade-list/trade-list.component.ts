import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { CoinbaseProTrade, CoinbaseProProduct } from 'src/app/models/coinbase-pro';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeListComponent implements OnInit {
  @Input() public current: Observable<CoinbaseProProduct>;
  @Input() public trades: Observable<CoinbaseProTrade[]>;

  constructor() {}

  public ngOnInit(): void {
  }

}
