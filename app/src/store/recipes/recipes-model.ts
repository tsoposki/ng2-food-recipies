import {makeTypedFactory, TypedRecord} from "typed-immutable-record";
import {List} from "immutable";
import {
  IRecipeIngredientRecord, IRecipeIngredient,
  createRecipeIngredientRecord
} from "../ingredients/ingredients-model";

export interface ICreateRecipe {
  name: string,
  source: string,
  ingredients: Array<IRecipeIngredient>,
  preparationTime: number,
  preparationInstructions: string
}

export interface IRestRecipe extends ICreateRecipe {
  id: string
}

export interface IRecipe {
  id: string,
  name: string,
  source: string,
  ingredients: List<IRecipeIngredientRecord>,
  preparationTime: number,
  preparationInstructions: string
}

export interface IRecipeRecord extends TypedRecord<IRecipeRecord>, IRecipe {}

const RecipeRecord = makeTypedFactory<IRecipe, IRecipeRecord>(defaultRecipeData());

export function createRecipeRecord(data: IRestRecipe): IRecipe {
  if(!data) {
    throw 'data cannot be undefined';
  }
  if(
    !data.ingredients ||
    data.ingredients.length === 0
  ) {
    throw 'ingredients cannot be empty';
  }

  return RecipeRecord({
    id: data.id,
    name: data.name,
    source: data.source,
    ingredients: List(data.ingredients.map(createRecipeIngredientRecord)),
    preparationTime: data.preparationTime,
    preparationInstructions: data.preparationInstructions
  });
}

function defaultRecipeData(): IRecipe {
  return {
    id: null,
    name: null,
    source: null,
    ingredients: null,
    preparationTime: null,
    preparationInstructions: null
  };
}
