import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },
  {
    path: 'principal',
    loadComponent: () => import('./paginas/principal/principal.page').then( m => m.PrincipalPage)
  },
  {
    path: 'character-detail/:id',
    loadComponent: () => import('./paginas/character-detail/character-detail.page').then( m => m.CharacterDetailPage)
  },
  {
    path: 'intro',
    loadComponent: () => import('./paginas/intro/intro.page').then( m => m.IntroPage)
  },
];
