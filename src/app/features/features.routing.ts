import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTING } from '../core/constants/routing.enum';
import { HomeComponent } from './public/home/home.component';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        // children: [
        //     {
        //         path: 'blog',
        //         loadChildren: () =>
        //             import('./public/public.module').then(m => m.PublicModule),
        //         // canActivate: [checkModuleEnable],
        //     },
        //     {
        //         path: "admin/categories",
        //         loadChildren: () =>
        //             import('./category/category.module').then(m => m.CategoryListModule),
        //         // canActivate: [checkModuleEnable],
        //     },
        //     {
        //         path: "admin/categories",
        //         loadChildren: () =>
        //             import('./auth/auth.module').then(m => m.AuthModule),
        //         // canActivate: [checkModuleEnable],
        //     },
        //     {
        //         path: "admin/categories",
        //         loadChildren: () =>
        //             import('./blog-post/blog-post.module').then(m => m.BlogPostModule),
        //         // canActivate: [checkModuleEnable],
        //     }
        // ],
    },
    { path: 'blog', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
    {
        path: 'admin/categories',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryListModule),
        canActivate: [authGuard]
    },
    { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    {
        path: 'blogposts',
        loadChildren: () => import('./blog-post/blog-post.module').then(m => m.BlogPostModule)
    },
    {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeaturesRoutingModule { }
