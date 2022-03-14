import { Routes } from '@angular/router';

import { AuthComponent } from '@layout/auth/auth.component';
import { LoginComponent } from '@views/login/login.component';
import { RegisterComponent } from '@views/register/register.component';

export const AuthRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register'
        }
      },
    ],
  },
];
