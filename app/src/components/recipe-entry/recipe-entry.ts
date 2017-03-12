import {Component, ChangeDetectionStrategy, Input, OnInit, SimpleChanges, OnChanges} from "@angular/core";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {IIngredientRecord, IRecipeIngredient} from "../../store/ingredients/ingredients-model";
import {BehaviorSubject, Subscription, Observable} from "rxjs/Rx";
import {List} from "immutable";
import {trackById, inputSelectDefaultValue, ONE_HOUR_MS, ONE_MIN_MS} from "../../services/util";
import {IngredientsDispatcher} from "../../store/ingredients/ingredients-dispatcher";
import {RecipesDispatcher} from "../../store/recipes/recipes-dispatcher";
import {ToasterService} from "../../services/toastr";
import {IRecipeRecord} from "../../store/recipes/recipes-model";
import {Router} from "@angular/router";


@Component({
  selector: 'recipe-entry',
  templateUrl: 'recipe-entry.html',
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEntryComponent implements OnInit, OnChanges {
  @Input() ingredients: List<IIngredientRecord>;
  @Input() recipe: IRecipeRecord;
  @Input() mode: 'create' | 'update' = 'create';

  recipeEntryForm: FormGroup;

  ingredientsList$: Observable<List<IIngredientRecord>>;
  isBusy$: Observable<boolean>;
  selectedIngredientsSubj = new BehaviorSubject<List<any>>(List());

  trackById = trackById;
  inputSelectDefaultValue = inputSelectDefaultValue;


  constructor(
    private _fb: FormBuilder,
    private _ingredientsDispatcher: IngredientsDispatcher,
    private _recipesDispatcher: RecipesDispatcher,
    private _toaster: ToasterService,
    private _router: Router
  ) {
    this.recipeEntryForm = this._createRecipeEntryForm();
    this.isBusy$ = this._createIsBusy$();
  }

  ngOnInit() {
    if(this.ingredients) {
      this.ingredientsList$ = this._createIngredientsList$(this.ingredients);
    }
    if(this.recipe) {
      this._initRecipeForm(this.recipe);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let {ingredients, recipe} = changes;
    if(
      ingredients &&
      ingredients.currentValue
    ) {
      this.ingredientsList$ = this._createIngredientsList$(this.ingredients);
    }

    if(
      recipe &&
      recipe.currentValue
    ) {
      this._initRecipeForm(this.recipe);
    }
  }

  submitRecipeEntryForm = ({name, source, preparationTimeHours, preparationTimeMinutes, preparationInstructions}: any): Subscription =>
    this.selectedIngredientsSubj
      .take(1)
      .subscribe(selectedIngredients => {
        if(selectedIngredients.isEmpty()) {
          this._toaster.showInfo('Please select at least one ingredient');
          return;
        }
        if(this.recipeEntryForm.value.preparationTimeHours + this.recipeEntryForm.value.preparationTimeMinutes === 0) {
          this._toaster.showInfo('Please enter the preparation time');
          return;
        }

        let data = {
          id: this.recipe ? this.recipe.id : null,
          name,
          source,
          ingredients: mapSelectedIngredientsToRecipeIngredients(selectedIngredients, this.ingredients),
          preparationTime: preparationTimeHours * ONE_HOUR_MS + preparationTimeMinutes * ONE_MIN_MS,
          preparationInstructions
        };
        (
          this.mode === 'create' ?
            this._recipesDispatcher.createRecipe(data) :
            this._recipesDispatcher.updateRecipe(data)
        )
          .do(() => this._router.navigate(['/recipes']))
          .subscribe(
            () => this._toaster.showSuccess(
              this.mode === 'update' ?
                'You have successfully edited the recipe' :
                'You have successfully created new recipe'
            ),
            (err = `There was an error while trying to ${this.mode} the recipe`) => this._toaster.showError(err)
          );
      });

  addIngredient = (ingredientName: string, quantity: number): Subscription =>
    this.selectedIngredientsSubj
      .take(1)
      .subscribe(selectedIngredients => {
        let ingredientIndex = selectedIngredients.findIndex(ingredient => ingredient.name === ingredientName);
        let ingredient = selectedIngredients.get(ingredientIndex);

        if(ingredientIndex >=0) {
          ingredient.control.setValue(quantity);
        } else {
          this.selectedIngredientsSubj.next(
            selectedIngredients.push({
              name: ingredientName,
              control: new FormControl(quantity)
            })
          );

          this._resetPreparationList();
        }

      });

  removeIngredient = (ingredient: {name: string, control: FormControl}): Subscription =>
    this.selectedIngredientsSubj
      .take(1)
      .subscribe(selectedIngredients => {
        let ingredientIndex = selectedIngredients.findIndex(theIngredient => theIngredient.name === ingredient.name);
        this.selectedIngredientsSubj.next(selectedIngredients.delete(ingredientIndex));
      });

  private _initRecipeForm(recipe: IRecipeRecord): void {
    this.recipeEntryForm.controls['name'].setValue(recipe.name);
    this.recipeEntryForm.controls['source'].setValue(this.recipe.source);
    this.recipeEntryForm.controls['preparationTimeHours'].setValue(Math.floor(recipe.preparationTime/ONE_HOUR_MS));
    this.recipeEntryForm.controls['preparationTimeMinutes'].setValue(Math.floor((recipe.preparationTime - Math.floor(recipe.preparationTime/ONE_HOUR_MS)*ONE_HOUR_MS) / ONE_MIN_MS));
    this.recipeEntryForm.controls['preparationInstructions'].setValue(recipe.preparationInstructions);

    this.selectedIngredientsSubj.next(
      recipe.ingredients
        .map(recipeIngredient => {return {name: recipeIngredient.ingredient.name, control: new FormControl(recipeIngredient.quantity)}})
        .toList()
    );

  }

  private _createIngredientsList$ = (initialIngredients: List<IIngredientRecord>): Observable<any> =>
    this.selectedIngredientsSubj
      .map(ingredients => initialIngredients.filter(obj => ingredients.findIndex(o => o.name === obj.name) < 0))
      .distinctUntilChanged()
      .publishReplay(1)
      .refCount();

  private _resetPreparationList(): void {
    this.recipeEntryForm.controls['selectedIngredient'].setValue(inputSelectDefaultValue);
    this.recipeEntryForm.controls['selectedIngredientQuantity'].setValue(null);
  }

  private _createIsBusy$ = (): Observable<boolean> =>
    Observable.combineLatest(
      this._ingredientsDispatcher.fetchingIngredients$,
      this._recipesDispatcher.creatingRecipe$,
      this._recipesDispatcher.updatingRecipes$,
      this._recipesDispatcher.fetchingRecipes$,
      this._recipesDispatcher.deletingRecipes$,
      (fetchingIngredients, creatingRecipe, updatingRecipes, fetchingRecipes, deletingRecipes) =>
        fetchingIngredients ||
        creatingRecipe ||
        deletingRecipes.has(this.recipe && this.recipe.id) ||
        updatingRecipes.has(this.recipe && this.recipe.id) ||
        (
          this.mode === 'update' &&
          fetchingRecipes
        )
    )
      .map(val => !!val)
      .distinctUntilChanged()
      .publishReplay(1)
      .refCount();

  private _createRecipeEntryForm = (): FormGroup =>
    this._fb.group({
      name: ['', Validators.compose([Validators.minLength(1), Validators.required])],
      source: [''],
      ingredientsQuantity: [null, Validators.required],
      selectedIngredient: [inputSelectDefaultValue],
      selectedIngredientQuantity: [null],
      preparationTimeHours: ['', Validators.required],
      preparationTimeMinutes: ['', Validators.required],
      preparationInstructions: ['', Validators.compose([Validators.minLength(15), Validators.required])]
    });

  deleteRecipe(recipe: IRecipeRecord) {
    let r = confirm(`Are you sure you want to delete recipe "${recipe.name}"?`);
    if(r) {
      this._recipesDispatcher
        .deleteRecipe(recipe.id)
        .do(() => this._router.navigate(['/recipes']))
        .subscribe(
          () => this._toaster.showSuccess('You have successfully deleted the recipe'),
          err => this._toaster.showError(err)
        );
    }
  }

}

const mapSelectedIngredientsToRecipeIngredients = (selectedIngredients: List<any>, availableIngredients: List<IIngredientRecord>): Array<IRecipeIngredient> =>
  selectedIngredients.map(ingredient => {
    return {
      ingredientId: availableIngredients.get(availableIngredients.findIndex(o => ingredient.name === o.name)).id,
      quantity: parseInt(ingredient.control.value)
    }
  }).toArray();
