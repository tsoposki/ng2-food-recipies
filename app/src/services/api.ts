import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {IIngredient} from "../store/ingredients/ingredients-model";
import {IRestRecipe, ICreateRecipe} from "../store/recipes/recipes-model";
import {mockIngredients, mockRecipes} from "../../spec/mock-data";
import {getGuid} from "./util";
import * as _ from "lodash";


@Injectable()
export class ApiService {

  getIngredients = (): Observable<Array<IIngredient>> =>
    Observable.of(mockIngredients).delay(getRandomResponseTime()); // mock implementation

  getRecipes = (): Observable<Array<IRestRecipe>> =>
    Observable.of(mockRecipes).delay(getRandomResponseTime()); // mock implementation

  createRecipe = (data: ICreateRecipe): Observable<IRestRecipe> =>
    Observable.of(
      _.chain(data)
        .clone()
        .extend({id: getGuid()})
        .value()
    )
      .delay(getRandomResponseTime()); // mock implementation

  updateRecipe = (data: IRestRecipe): Observable<IRestRecipe> =>
    Observable.of(data).delay(getRandomResponseTime()); // mock implementation

  deleteRecipe = (recipeId: string): Observable<string> =>
    Observable.of(recipeId).delay(getRandomResponseTime()); // mock implementation

  getRecipe = (id: string): Observable<IRestRecipe> => {
    let recipe = _.find(mockRecipes, {id});
    return recipe ? Observable.of(recipe).delay(getRandomResponseTime()) : Observable.throw(`Recipe with id:${id} do not exist.`); // mock implementation
  }
}


// TODO: dev only, used for fake mock implementations
const minResponseTime = 150;
const maxResponseTime = 1500;
const getRandomResponseTime = (): number =>
  Math.random() * (maxResponseTime - minResponseTime) + minResponseTime;
