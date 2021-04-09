import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroComponent } from './modules/general/hero/hero.component';
import { HomeComponent } from "./modules/general/home/home.component"
import { NotFoundComponent } from "./modules/general/not-found/not-found.component"

import { GetHeroById } from './services/get-hero-by-id-resolver.service';
import { GetHeroes } from "./services/get-heroes-resolver"

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { response: GetHeroes } },
  {
    path: 'hero/:id', component: HeroComponent, resolve: { response: GetHeroById }
  },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
