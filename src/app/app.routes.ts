import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UpdateComponent } from './pages/admin/users/update/update.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        data: {
            hasNavBar: false
        }
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent),
        data: {
            hasNavBar: false
        }
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: {
            hasNavBar: true
        },
        canActivate: [AuthGuard],
        children: [
            {
                path: 'admin',
                canActivate: [AdminGuard],
                children: [
                    { path: '', redirectTo: 'users', pathMatch: 'full' },
                    {
                        path: 'users',
                        loadComponent: () => import('./pages/admin/users/users.component').then(m => m.UsersComponent),
                        data: {
                            hasNavBar: true
                        },
                    },
                    {
                        path: 'users/register',
                        loadComponent: () => import('./pages/admin/users/register/register.component').then(m => m.RegisterComponent),
                        data: {
                            hasNavBar: false
                        }
                    },
                    {
                        path: 'users/update/:id',
                        loadComponent: () => import('./pages/admin/users/update/update.component').then(m => UpdateComponent),
                        data: {
                            hasNavBar: false
                        }
                    },
                    {
                        path: 'categories',
                        loadComponent: () => import('./pages/admin/categories/categories.component').then(m => m.CategoriesComponent),         
                        data: {
                            hasNavBar: true
                        }
                    },
                    {
                        path: 'categories/register',
                        loadComponent: () => import('./pages/admin/categories/register/register.component').then(m => m.RegisterCategoryComponent),
                        data: {
                            hasNavBar: false
                        }
                    },
                    {
                        path: 'categories/update/:id',
                        loadComponent: () => import('./pages/admin/categories/update/update.component').then(m => m.UpdateCategoryComponent),
                        data: {
                            hasNavBar: false
                        }
                    }/*,
                    {
                        path: 'orders'
                    },
                    {
                        path: 'products'
                    },
                    {
                        path: 'stocks'
                    },
                    {
                        path: 'ingredients'
                    },
                    {
                        path: 'payments'
                    }*/
                ]
            },
            {
                path: 'client',
                loadComponent: () => import('./pages/client/client.component').then(m => m.ClientComponent),
                data: {
                    hasNavBar: false
                }
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
