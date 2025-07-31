import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { NotFound } from './pages/not-found/not-found';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path : '',
        redirectTo : '/login',
        pathMatch : 'full'
    },
    {
        path : 'login',
        component : LoginPage
    }, 
    {
        path : 'management',
        loadChildren : () => import('./pages/navbar-module').then(m => m.NavbarModule)
    },
    {
        path : '**',
        component : NotFound
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}