import { Route } from '@angular/router';

import { CrudComponent } from '@views/product/crud/crud.component';
import { ProductUpdateComponent } from '@components/product/product-update/product-update.component';
import { ProductCreateComponent } from '@components/product/product-create/product-create.component';
import { ProductReadComponent } from '@components/product/product-read/product-read.component';

export const ProductsRoutes: Route = {
  path: 'products',
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
};
