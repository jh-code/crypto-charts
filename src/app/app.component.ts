import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { MatSlideToggleChange } from '@angular/material';
import { SetTheme } from './actions/app.actions';
import { AppState } from './state/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Select(AppState.theme) theme$: Observable<string>;

  constructor(
    private store: Store
  ) {}

  public ngOnInit(): void {
    //
  }

  public _setTheme(event: MatSlideToggleChange) {
    const theme = event.checked ? 'light-theme' : 'dark-theme';
    this.store.dispatch(new SetTheme(theme));
  }

}
