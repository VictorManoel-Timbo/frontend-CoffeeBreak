import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

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
                        loadComponent: () => import('./pages/admin/users/register/register.component').then(m => m.RegisterComponent),
                        data: {
                            hasNavBar: false
                        }
                    },
                    /*{
                        path: 'categories'
                    },
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
