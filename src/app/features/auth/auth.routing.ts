import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "../auth/guards/auth.guard";

const routes: Routes = [
    // {
    //     path: '',
    //     data: {
    //         breadcrumb: 'Category',
    //     },
    //     children: [
    //         {
    //             path: '',
    //             component: CategoryListComponent,
    //             canActivate: [authGuard]
    //         },
    //         {
    //             path: 'add',
    //             component: AddCategoryComponent,
    //             canActivate: [authGuard]
    //         },
    //         {
    //             path: ':id',
    //             component: EditCategoryComponent,
    //             canActivate: [authGuard]
    //         },
    //     ],
    // },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }
