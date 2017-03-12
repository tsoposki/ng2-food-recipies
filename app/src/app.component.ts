import {Component, ViewContainerRef} from "@angular/core";
import {IngredientsDispatcher} from "./store/ingredients/ingredients-dispatcher";
import {RecipesDispatcher} from "./store/recipes/recipes-dispatcher";
import {ToastsManager} from "ng2-toastr/ng2-toastr";

@Component({
  selector: 'ng2-app',
  templateUrl: 'app.component.html',
  moduleId: module.id
})
export class AppComponent {

  constructor(
    ingredientsDispatcher: IngredientsDispatcher,
    recipesDispatcher: RecipesDispatcher,
    toastr: ToastsManager,
    vRef: ViewContainerRef
  ) {
    toastr.setRootViewContainerRef(vRef);
    ingredientsDispatcher.fetchIngredients().subscribe();
    recipesDispatcher.fetchRecipes().subscribe();
  }
}
