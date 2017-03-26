import {AppComponent} from "./app.component";
import {CurtainComponent} from "./components/curtain/curtain";
import {RecipeEntryComponent} from "./components/recipe-entry/recipe-entry";
import {RecipeEntryRoutedComponent} from "./routed-components/recipe-entry-routed/recipe-entry-routed";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {routing} from "./routes";
import {StoreModule} from "@ngrx/store";
import {reducer} from "./store/reducers";
import {ApiService} from "./services/api";
import {IngredientsDispatcher} from "./store/ingredients/ingredients-dispatcher";
import {RecipesDispatcher} from "./store/recipes/recipes-dispatcher";
import {NgModule} from "@angular/core";
import {LocationStrategy, APP_BASE_HREF, HashLocationStrategy} from "@angular/common";
import {ToasterService, CustomOption} from "./services/toastr";
import {RecipesNode} from "./nodes/recipes-node";
import {RecipeListComponent} from "./components/recipe-list/recipe-list";
import {RecipeListRoutedComponent} from "./routed-components/recipe-list-routed/recipe-list-routed";
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
    CurtainComponent,
    RecipeEntryComponent,
    RecipeListComponent,
    RecipeListRoutedComponent,
    RecipeEntryRoutedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    BrowserAnimationsModule,

    ToastModule.forRoot(),
    StoreModule.provideStore(reducer)
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: ToastOptions, useClass: CustomOption},
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },

    ApiService,
    IngredientsDispatcher,
    RecipesDispatcher,
    ToasterService,
    RecipesNode
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
}
