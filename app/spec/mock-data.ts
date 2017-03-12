import {IIngredient} from "../src/store/ingredients/ingredients-model";
import {IRestRecipe} from "../src/store/recipes/recipes-model";
import {ONE_MIN_MS} from "../src/services/util";


export const mockIngredients: Array<IIngredient> = [
  {
    id: "flour",
    name: "Flour"
  },
  {
    id: "milk",
    name: "Milk"
  },
  {
    id: "oil",
    name: "Oil"
  },
  {
    id: "salt",
    name: "Salt"
  },
  {
    id: "sugar",
    name: "Sugar"
  },
  {
    id: "eggs",
    name: "Eggs"
  },
  {
    id: "tomatoes",
    name: "Tomatoes"
  },
  {
    id: "tomatoes",
    name: "Tomatoes"
  },
  {
    id: "peppers",
    name: "Peppers"
  },
  {
    id: "cheese",
    name: "Cheese"
  },
  {
    id: "potatoes",
    name: "Potatoes"
  },
  {
    id: "meat",
    name: "Meat"
  }
];


export const mockRecipes: Array<IRestRecipe> = [
  {
    id: "15198465315152",
    name: "Chicken Savoy",
    source: "www.source1.com",
    ingredients: [
      {
        id: "fjIAsXihVjlaS",
        ingredientId: "cheese",
        quantity: 5
      },
      {
        id: "Jsjflaweqxz",
        ingredientId: "eggs",
        quantity: 3
      }
    ],
    preparationTime: 35*ONE_MIN_MS,
    preparationInstructions: "This is sample prep. instruction 1"
  },
  {
    id: "493609283721",
    name: "Slow Cooker Beef Stew",
    source: "www.source2.com",
    ingredients: [
      {
        id: "asdVDCXASdqw",
        ingredientId: "potatoes",
        quantity: 4
      },
      {
        id: "asdVDCXASdqwQb43gfji",
        ingredientId: "meat",
        quantity: 2
      }
    ],
    preparationTime: 90*ONE_MIN_MS,
    preparationInstructions: "This is sample prep. instruction 2"
  }
];
