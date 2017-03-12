import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {Set, OrderedMap} from "immutable";
import {IIngredientRecord, IIngredient} from "./ingredients-model";
import {BaseDispatcher} from "../base-dispatcher";
import {known} from "../../services/util";
import {IngredientsActions} from "../main/main-reducer";
import {ApiService} from "../../services/api";


@Injectable()
export class IngredientsDispatcher extends BaseDispatcher {
  ingredients$:         Observable<OrderedMap<string, IIngredientRecord>>;
  fetchingIngredients$: Observable<Set<string>>;
  updatingIngredients$: Observable<Set<string>>;
  deletingIngredients$: Observable<Set<string>>;
  creatingIngredient$:  Observable<boolean>;

  constructor(
    store: Store<any>,
    private _api: ApiService
  ) {
    super(store);

    let state$                = store.select<any>('Main');
    this.ingredients$         = state$.map(state => state.getIn(['entities', 'ingredients'])).filter(known).distinctUntilChanged().publishReplay(1).refCount();
    this.fetchingIngredients$ = state$.map(state => state.get('fetchingIngredients')).distinctUntilChanged();
    this.updatingIngredients$ = state$.map(state => state.get('updatingIngredients')).distinctUntilChanged();
    this.deletingIngredients$ = state$.map(state => state.get('deletingIngredients')).distinctUntilChanged();
    this.creatingIngredient$  = state$.map(state => state.get('creatingIngredient')).distinctUntilChanged();
  }

  fetchIngredients(): Observable<Array<IIngredient>> {
    this.dispatch(IngredientsActions.FETCHING_INGREDIENTS);

    return this._api
      .getIngredients()
      .do(ingredients => this.dispatch(IngredientsActions.SET_INGREDIENTS, ingredients))
      .finally(() => this.dispatch(IngredientsActions.NOT_FETCHING_INGREDIENTS));

  }
}
