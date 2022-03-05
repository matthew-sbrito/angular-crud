import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './views/home/home.component';
import { CrudComponent } from './views/product/crud/crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductReadComponent } from '@components/product/product-read/product-read.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'products',
    // canActivate: [AuthGuard],
    component: CrudComponent,
    children: [
      {
        path: '',
        component: ProductReadComponent,
      },
      {
        path: 'create',
        component: ProductCreateComponent,
      },
      {
        path: 'update/:id',
        component: ProductUpdateComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
