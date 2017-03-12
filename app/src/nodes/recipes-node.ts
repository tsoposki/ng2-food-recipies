import {OrderedMap} from "immutable";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {IRecipeRecord} from "../store/recipes/recipes-model";
import {RecipesDispatcher} from "../store/recipes/recipes-dispatcher";
import {IngredientsDispatcher} from "../store/ingredients/ingredients-dispatcher";
import {IIngredientRecord} from "../store/ingredients/ingredients-model";


@Injectable()
export class RecipesNode {
  recipes$: Observable<OrderedMap<string, IRecipeRecord>>;

  constructor(
    private _recipesDispatcher    : RecipesDispatcher,
    private _ingredientsDispatcher: IngredientsDispatcher
  ) {
    this.recipes$ = this._createRecipes$();
  }

  observeRecipe = (recipeId$: Observable<string>): Observable<IRecipeRecord> =>
    Observable.combineLatest(
      this.recipes$,
      recipeId$,
      (recipes, recipeId) => recipes.get(recipeId)
    );

  private _createRecipes$ = (): Observable<OrderedMap<string, IRecipeRecord>> =>
    Observable.combineLatest(
      this._recipesDispatcher.recipes$,
      this._ingredientsDispatcher.ingredients$,
      (recipes, ingredients) => {return {recipes, ingredients}}
    )
      .map(({recipes, ingredients}) => toJoinedRecipes(recipes, ingredients))
      .distinctUntilChanged()
      .publishReplay(1)
      .refCount();

}


export const toJoinedRecipes = (
  recipes    : OrderedMap<string, IRecipeRecord>,
  ingredients: OrderedMap<string, IIngredientRecord>
)            : OrderedMap<string, IRecipeRecord> =>
  <OrderedMap<string, IRecipeRecord>>recipes.map(recipe => joinRecipe(recipe, ingredients));


export const joinRecipe = (recipe: IRecipeRecord, ingredients: OrderedMap<string, IIngredientRecord>): IRecipeRecord =>
  recipe.withMutations(recipe => {
    recipe.set(
      'ingredients',
      recipe.ingredients.map(ingredient => ingredient.set('ingredient', ingredients.get(ingredient.ingredientId)))
    )
  });
