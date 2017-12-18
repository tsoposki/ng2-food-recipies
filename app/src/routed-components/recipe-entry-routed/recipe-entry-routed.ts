import {Component, ChangeDetectionStrategy, OnDestroy} from "@angular/core";
import {IngredientsDispatcher} from "../../store/ingredients/ingredients-dispatcher";
import {Observable, Subscription} from "rxjs/Rx";
import {IIngredientRecord} from "../../store/ingredients/ingredients-model";
import {List} from "immutable";
import {IRecipeRecord} from "../../store/recipes/recipes-model";
import {ActivatedRoute} from "@angular/router";
import {RecipesNode} from "../../nodes/recipes-node";
import {RecipesDispatcher} from "../../store/recipes/recipes-dispatcher";
import {identity} from "../../services/util";


@Component({
  selector: 'app-recipe-entry-routed',
  templateUrl: 'recipe-entry-routed.html',
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEntryRoutedComponent implements OnDestroy {
  ingredients$: Observable<List<IIngredientRecord>>;
  recipe$     : Observable<IRecipeRecord>;
  recipeId$   : Observable<string>;

  private _subs: Array<Subscription> = [];

  constructor(
    private _ingredientsDispatcher: IngredientsDispatcher,
    private _recipesNode          : RecipesNode,
    private _activatedRoute       : ActivatedRoute,
    private _recipesDispatcher    : RecipesDispatcher
  ) {
    this.ingredients$  = this._ingredientsDispatcher.ingredients$.map(val => val.toList());
    this.recipeId$     = this._createRecipeId$();
    this.recipe$       = this._recipesNode.observeRecipe(this.recipeId$);

    this._subs.push(this._fetchRecipeOnTriggers());
  }

  ngOnDestroy() {
    this._subs.forEach(sub => sub.unsubscribe());
  }

  private _createRecipeId$ = (): Observable<string> =>
    this._activatedRoute
      .params
      .map(({id}) => id)
      .filter(identity)
      .distinctUntilChanged()
      .publishReplay(1)
      .refCount();

  private _fetchRecipeOnTriggers = (): Subscription =>
    Observable.combineLatest(
      this._recipesDispatcher.recipes$,
      this.recipeId$,
      (recipes, id) => {return {recipes, id}}
    )
      .filter(({recipes, id}) => !recipes || !recipes.has(id))
      .flatMap(({id}) => this._recipesDispatcher.fetchRecipe(id))
      .subscribe();

}
