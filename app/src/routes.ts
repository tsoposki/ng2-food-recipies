import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {RecipeEntryRoutedComponent} from "./routed-components/recipe-entry-routed/recipe-entry-routed";
import {RecipeListRoutedComponent} from "./routed-components/recipe-list-routed/recipe-list-routed";


export const APP_ROUTES: Routes = [
  {path: '', component: RecipeListRoutedComponent},
  {path: 'recipes', component: RecipeListRoutedComponent},
  {path: 'recipe', component: RecipeEntryRoutedComponent},
  {path: 'recipe/:id', component: RecipeEntryRoutedComponent},

  {path: '**', component: RecipeListRoutedComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
