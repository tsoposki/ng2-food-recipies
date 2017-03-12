import {Component, ChangeDetectionStrategy} from "@angular/core";
import {Observable} from "rxjs";
import {IRecipeRecord} from "../../store/recipes/recipes-model";
import {List} from "immutable";
import {RecipesNode} from "../../nodes/recipes-node";
import {RecipesDispatcher} from "../../store/recipes/recipes-dispatcher";


@Component({
  selector: 'recipe-list-routed',
  templateUrl: 'recipe-list-routed.html',
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListRoutedComponent {
  recipes$: Observable<List<IRecipeRecord>>;
  isBusy$ : Observable<boolean>;

  constructor(
    recipesDispatcher : RecipesDispatcher,
    recipesNode       : RecipesNode
  ) {
    this.recipes$  = recipesNode.recipes$.map(recipes => recipes.toList());
    this.isBusy$   = recipesDispatcher.fetchingRecipes$;
  }

}
