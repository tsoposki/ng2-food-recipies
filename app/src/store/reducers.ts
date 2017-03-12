import {MainReducer as Main} from "./main/main-reducer";
import {combineReducers} from "@ngrx/store";

const reducers = {
  Main
};
const productionReducer = combineReducers(reducers);

export function reducer(state: any, action: any) {
  return productionReducer(state, action);
}
