import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {Set, OrderedMap} from "immutable";
import {BaseDispatcher} from "../base-dispatcher";
import {known} from "../../services/util";
import {RecipesActions} from "../main/main-reducer";
import {ApiService} from "../../services/api";
import {IRecipeRecord, IRestRecipe, ICreateRecipe} from "./recipes-model";


@Injectable()
export class RecipesDispatcher extends BaseDispatcher {
  recipes$:         Observable<OrderedMap<string, IRecipeRecord>>;
  fetchingRecipes$: Observable<boolean>;
  fetchingRecipe$:  Observable<Set<string>>;
  updatingRecipes$: Observable<Set<string>>;
  deletingRecipes$: Observable<Set<string>>;
  creatingRecipe$:  Observable<boolean>;

  constructor(
    store: Store<any>,
    private _api: ApiService
  ) {
    super(store);

    let state$            = store.select<any>('Main');
    this.recipes$         = state$.map(state => state.getIn(['entities', 'recipes'])).filter(known).distinctUntilChanged();
    this.fetchingRecipes$ = state$.map(state => state.get('fetchingRecipes')).distinctUntilChanged();
    this.fetchingRecipe$  = state$.map(state => state.get('fetchingRecipe')).distinctUntilChanged();
    this.updatingRecipes$ = state$.map(state => state.get('updatingRecipes')).distinctUntilChanged();
    this.deletingRecipes$ = state$.map(state => state.get('deletingRecipes')).distinctUntilChanged();
    this.creatingRecipe$  = state$.map(state => state.get('creatingRecipe')).distinctUntilChanged();
  }

  fetchRecipes(): Observable<any> {
    this.dispatch(RecipesActions.FETCHING_RECIPES);

    return this._api
      .getRecipes()
      .do(recipes => this.dispatch(RecipesActions.SET_RECIPES, recipes))
      .finally(() => this.dispatch(RecipesActions.NOT_FETCHING_RECIPES));
  }

  fetchRecipe(id: string): Observable<IRestRecipe> {
    let theId = id;
    this.dispatch(RecipesActions.FETCHING_RECIPES, id);

    return this._api
      .getRecipe(id)
      .do(res => this.dispatch(RecipesActions.SET_RECIPE, res))
      .finally(() => this.dispatch(RecipesActions.NOT_FETCHING_RECIPES, theId));
  }

  createRecipe(data: ICreateRecipe): Observable<IRestRecipe> {
    this.dispatch(RecipesActions.CREATING_RECIPE);

    return this._api
      .createRecipe(data)
      .do(res => this.dispatch(RecipesActions.SET_RECIPE, res))
      .finally(() => this.dispatch(RecipesActions.NOT_CREATING_RECIPE));
  }


  updateRecipe(data: IRestRecipe): Observable<IRestRecipe> {
    let recipeId = data.id;
    this.dispatch(RecipesActions.UPDATING_RECIPE, recipeId);

    return this._api
      .updateRecipe(data)
      .do(res => this.dispatch(RecipesActions.SET_RECIPE, res))
      .finally(() => this.dispatch(RecipesActions.NOT_UPDATING_RECIPE, recipeId));
  }

  deleteRecipe(recipeId: string): Observable<string> {
    let theRecipeId = recipeId;
    this.dispatch(RecipesActions.DELETING_RECIPE, theRecipeId);

    return this._api
      .deleteRecipe(theRecipeId)
      .do(() => this.dispatch(RecipesActions.DELETE_RECIPE, theRecipeId))
      .finally(() => this.dispatch(RecipesActions.NOT_DELETING_RECIPE, theRecipeId));
  }

}
