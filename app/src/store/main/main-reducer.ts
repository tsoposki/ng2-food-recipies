import {fromJS, Map, Set, OrderedMap} from "immutable";
import {Action} from "@ngrx/store";
import {UNKNOWN, Unknown} from "../../services/util";
import {IIngredientRecord, createIngredientRecord} from "../ingredients/ingredients-model";
import {IRecipeRecord, createRecipeRecord} from "../recipes/recipes-model";


export const IngredientsActions: any = {
  SET_INGREDIENTS: 'SET_INGREDIENTS',
  FETCHING_INGREDIENTS: 'FETCHING_INGREDIENTS',
  NOT_FETCHING_INGREDIENTS: 'NOT_FETCHING_INGREDIENTS',
  UPDATING_INGREDIENT: 'UPDATING_INGREDIENT',
  NOT_UPDATING_INGREDIENT: 'NOT_UPDATING_INGREDIENT',
  DELETING_INGREDIENT: 'DELETING_INGREDIENT',
  NOT_DELETING_INGREDIENT: 'NOT_DELETING_INGREDIENT',
  CREATING_INGREDIENT: 'CREATING_INGREDIENT',
  NOT_CREATING_INGREDIENT: 'NOT_CREATING_INGREDIENT'
};

export const RecipesActions: any = {
  SET_RECIPE: 'SET_RECIPE',
  DELETE_RECIPE: 'DELETE_RECIPE',
  SET_RECIPES: 'SET_RECIPES',
  FETCHING_RECIPES: 'FETCHING_RECIPES',
  NOT_FETCHING_RECIPES: 'NOT_FETCHING_RECIPES',
  FETCHING_RECIPE: 'FETCHING_RECIPE',
  NOT_FETCHING_RECIPE: 'NOT_FETCHING_RECIPE',
  UPDATING_RECIPE: 'UPDATING_RECIPE',
  NOT_UPDATING_RECIPE: 'NOT_UPDATING_RECIPE',
  DELETING_RECIPE: 'DELETING_RECIPE',
  NOT_DELETING_RECIPE: 'NOT_DELETING_RECIPE',
  CREATING_RECIPE: 'CREATING_RECIPE',
  NOT_CREATING_RECIPE: 'NOT_CREATING_RECIPE'
};

const initialState: IState = fromJS({
  fetchingIngredients: false,
  updatingIngredients: Set(),
  deletingIngredients: Set(),
  creatingIngredient: false,

  fetchingRecipes: false,
  fetchingRecipe: Set(),
  updatingRecipes: Set(),
  deletingRecipes: Set(),
  creatingRecipe: false,

  entities: {
    ingredients: UNKNOWN,
    recipes: UNKNOWN
  }
});
export interface IState extends Map<string, any> {
  fetchingIngredients: boolean,
  fetchingRecipes: boolean,

  updatingIngredients: Set<string>,
  deletingIngredients: Set<string>,
  creatingIngredient: boolean,

  fetchingRecipe: Set<string>,
  updatingRecipes: Set<string>,
  deletingRecipes: Set<string>,
  creatingRecipe: boolean,

  entities: {
    ingredients: Unknown | Map<string, IIngredientRecord>,
    recipes: Unknown | Map<string, IRecipeRecord>
  }
}



export const MainReducer = (state = initialState, action: Action) => {
  switch (action.type) {

    // IngredientsActions
    case IngredientsActions.SET_INGREDIENTS:
      return setEntities({
        state,
        path: ['entities', 'ingredients'],
        collection: action.payload,
        entityConstructor: createIngredientRecord
      });
    case IngredientsActions.FETCHING_INGREDIENTS:
      return state.set('fetchingIngredients', true);

    case IngredientsActions.NOT_FETCHING_INGREDIENTS:
      return state.set('fetchingIngredients', false);

    case IngredientsActions.UPDATING_INGREDIENT:
      return state.set('updatingIngredients', state.get('updatingIngredients').add(action.payload));

    case IngredientsActions.NOT_UPDATING_INGREDIENT:
      return state.set('updatingIngredients', state.get('updatingIngredients').delete(action.payload));

    case IngredientsActions.DELETING_INGREDIENT:
      return state.set('deletingIngredients', state.get('deletingIngredients').add(action.payload));

    case IngredientsActions.NOT_DELETING_INGREDIENT:
      return state.set('deletingIngredients', state.get('deletingIngredients').delete(action.payload));

    case IngredientsActions.CREATING_INGREDIENT:
      return state.set('creatingIngredient', state.get('creatingIngredient').add(action.payload));

    case IngredientsActions.NOT_CREATING_INGREDIENT:
      return state.set('creatingIngredient', state.get('creatingIngredient').delete(action.payload));

    // RecipesActions
    case RecipesActions.SET_RECIPES:
      return setEntities({
        state,
        path: ['entities', 'recipes'],
        collection: action.payload,
        entityConstructor: createRecipeRecord
      });

    case RecipesActions.SET_RECIPE:
      return state.withMutations(state => {
        if(state.getIn(['entities', 'recipes']) === UNKNOWN) {
          state.setIn(['entities', 'recipes'], OrderedMap());
        }
        state.setIn(
          ['entities', 'recipes', action.payload.id],
          createRecipeRecord(action.payload)
        );
      });

    case RecipesActions.DELETE_RECIPE:
      return state.deleteIn(['entities', 'recipes', action.payload]);

    case RecipesActions.FETCHING_RECIPES:
      return state.set('fetchingRecipes', true);

    case RecipesActions.NOT_FETCHING_RECIPES:
      return state.set('fetchingRecipes', false);

    case RecipesActions.FETCHING_RECIPE:
      return state.set('fetchingRecipe', state.get('fetchingRecipe').add(action.payload));

    case RecipesActions.NOT_FETCHING_RECIPE:
      return state.set('fetchingRecipe', state.get('fetchingRecipe').delete(action.payload));

    case RecipesActions.UPDATING_RECIPE:
      return state.set('updatingRecipes', state.get('updatingRecipes').add(action.payload));

    case RecipesActions.NOT_UPDATING_RECIPE:
      return state.set('updatingRecipes', state.get('updatingRecipes').delete(action.payload));

    case RecipesActions.DELETING_RECIPE:
      return state.set('deletingRecipes', state.get('deletingRecipes').add(action.payload));

    case RecipesActions.NOT_DELETING_RECIPE:
      return state.set('deletingRecipes', state.get('deletingRecipes').delete(action.payload));

    case RecipesActions.CREATING_RECIPE:
      return state.set('creatingRecipe', true);

    case RecipesActions.NOT_CREATING_RECIPE:
      return state.set('creatingRecipe', false);

    default:
      return state;
  }
};

const setEntities = ({identifier='id', state, collection=[], path, entityConstructor=fromJS}: IUpdateEntities): Map<any,any> =>
  state.withMutations(state => {
    if(state.getIn(path) === UNKNOWN) {
      state.setIn(path, OrderedMap());
    }

    state.setIn(
      path,
      OrderedMap(
        collection.reduce((memo, item) => {
          memo[item.id] = entityConstructor(item);
          return memo;
        }, {})
      )
    );
  });

interface IUpdateEntities {
  state: IState,
  path: Array<string>,
  collection: Array<any>,
  entityConstructor: Function,
  identifier?: string
}
