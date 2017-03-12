import {makeTypedFactory, TypedRecord} from "typed-immutable-record";


export interface IIngredient {
  id: string,
  name: string
}

export interface IIngredientRecord extends TypedRecord<IIngredientRecord>, IIngredient {}
const IngredientRecord = makeTypedFactory<IIngredient, IIngredientRecord>(defaultIngredientData());
export function createIngredientRecord(data: IIngredient): IIngredientRecord {
  return IngredientRecord(data);
}

function defaultIngredientData(): IIngredient {
  return {
    id: null,
    name: null
  };
}

export interface IRecipeIngredient {
  id?: string,
  ingredientId: string,
  ingredient?: IIngredientRecord,
  quantity: number
}

export interface IRecipeIngredientRecord extends TypedRecord<IRecipeIngredientRecord>, IRecipeIngredient {}
const RecipeIngredientRecord = makeTypedFactory<IRecipeIngredient, IRecipeIngredientRecord>(defaultRecipeIngredientData());
export function createRecipeIngredientRecord(data: IRecipeIngredient): IRecipeIngredientRecord {
  return RecipeIngredientRecord(data);
}

function defaultRecipeIngredientData(): IRecipeIngredient {
  return {
    id: null,
    ingredientId: null,
    ingredient: null,
    quantity: null
  };
}

