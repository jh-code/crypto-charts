import { State, Action, StateContext, Selector } from '@ngxs/store';
import { DEFAULT_THEME } from '../app.constants';
import { SetTheme } from '../actions/app.actions';

export interface AppStateModel {
  theme: string;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    theme: DEFAULT_THEME
  }
})
export class AppState {
  @Selector() static theme(state: AppStateModel): string {
    return state.theme;
  }

  @Action(SetTheme)
  setTheme({ patchState }: StateContext<AppStateModel>, { theme }: SetTheme): void {
    // TODO: save in Localstorage?
    patchState({ theme });
  }
}
