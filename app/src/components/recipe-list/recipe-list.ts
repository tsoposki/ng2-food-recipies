import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {IRecipeRecord} from "../../store/recipes/recipes-model";
import {List, Set} from "immutable";
import {trackById, getSubstrWithoutCuttingWord, ONE_HOUR_MS, ONE_MIN_MS} from "../../services/util";
import {IRecipeIngredientRecord} from "../../store/ingredients/ingredients-model";
import {Observable} from "rxjs/Rx";
import {RecipesDispatcher} from "../../store/recipes/recipes-dispatcher";
import {ToasterService} from "../../services/toastr";


@Component({
  selector: 'recipe-list',
  templateUrl: 'recipe-list.html',
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent {
  @Input() recipes: List<IRecipeRecord>;

  trackById                              = trackById;
  getIngredientsPreviewText              = getIngredientsPreviewText;
  getPreparationInstructionsPreviewText  = getPreparationInstructionsPreviewText;
  getPreparationTimePreviewText          = getPreparationTimePreviewText;
  busyRecipes$: Observable<Set<string>>;

  constructor(
    private _recipesDispatcher: RecipesDispatcher,
    private _toaster: ToasterService
  ) {
    this.busyRecipes$ = this._createBusyRecipes$();
  }

  deleteRecipe(recipe: IRecipeRecord) {
    let r = confirm(`Are you sure you want to delete recipe "${recipe.name}"?`);
    if(r) {
      this._recipesDispatcher
        .deleteRecipe(recipe.id)
        .subscribe(
          () => this._toaster.showSuccess('You have successfully deleted the recipe'),
          err => this._toaster.showError(err)
        );
    }
  }

  private _createBusyRecipes$ = (): Observable<Set<string>> =>
    Observable.combineLatest(
      this._recipesDispatcher.deletingRecipes$,
      this._recipesDispatcher.updatingRecipes$,
      (deletingRecipes, updatingRecipes) => deletingRecipes.merge(updatingRecipes)
    )
      .distinctUntilChanged()
      .publishReplay(1)
      .refCount();

}

export const getIngredientsPreviewText = (ingredients: List<IRecipeIngredientRecord>) => {
  let ingredientNames = ingredients.take(3).map(recipeIngredient => `${recipeIngredient.quantity} ${recipeIngredient.ingredient.name}`).toArray();

  if(ingredients.count() > 3) {
    ingredientNames.push("(...)");
  }
  return ingredientNames.join(", ");
};

export const getPreparationInstructionsPreviewText = (preparationText: string) =>
  preparationText.length <= 50 ?
    preparationText :
    getSubstrWithoutCuttingWord(preparationText, 50) + " (...)";


export function getPreparationTimePreviewText(preparationTime: number) {
  let hours = Math.floor(preparationTime/ONE_HOUR_MS);
  let minutes = Math.floor((preparationTime - Math.floor(preparationTime/ONE_HOUR_MS)*ONE_HOUR_MS) / ONE_MIN_MS);

  return (
    hours > 0 ?
      `${hours} ${hours === 1 ? 'hour' : 'hours'} ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}` :
      `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
  );
}
