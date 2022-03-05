import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

/** MAIN LAYOUT */
import { MainComponent } from '@layout/main/main.component';

/** ROUTES */
import { AuthRoutes } from '@routes/auth.routes';
import { HomeRoutes } from '@routes/home.routes';
import { ProductsRoutes } from '@routes/products.routes';

const MainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      HomeRoutes,
      ProductsRoutes,
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(AuthRoutes),
    RouterModule.forRoot(MainRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
