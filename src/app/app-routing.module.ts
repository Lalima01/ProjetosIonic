import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule), canActivate: [LoggedGuard] },
  { path: 'aporte', loadChildren: () => import('./pages/aporte/aporte.module').then(m => m.AportePageModule), canActivate: [AuthGuard] },
  // tslint:disable-next-line: max-line-length
  { path: 'aporte/:id', loadChildren: () => import('./pages/aporte/aporte.module').then(m => m.AportePageModule),
  canActivate: [AuthGuard] },
  { path: 'custo', loadChildren: () => import('./pages/custo/custo.module').then( m => m.CustoPageModule)
  , canActivate: [AuthGuard] },
  { path: 'custo/:id', loadChildren: () => import('./pages/custo/custo.module').then(m => m.CustoPageModule),
  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
