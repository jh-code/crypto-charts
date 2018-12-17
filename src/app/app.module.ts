import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AppState } from './state/app.state';
import { TradeState } from './state/trade.state';
import { environment } from 'src/environments/environment';
import { CoinbaseProService } from './services/coinbase-pro.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([AppState, TradeState], { developmentMode: !environment.production }),
    // NgxsLoggerPluginModule.forRoot(),
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers: [CoinbaseProService],
  bootstrap: [AppComponent]
})
export class AppModule { }
