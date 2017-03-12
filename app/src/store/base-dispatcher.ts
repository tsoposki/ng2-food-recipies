import {Store} from "@ngrx/store";


export class BaseDispatcher {
  constructor (private _store:Store<any>) {}

  protected dispatch(type: string, payload?: any): void {
    let action: IAction = { type };
    if (payload) { action.payload = payload }
    this._store.dispatch(action);
  }
}

interface IAction {
  type: string,
  payload?: any
}
