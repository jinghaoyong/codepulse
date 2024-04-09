import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryListComponent } from "./category-list/category-list.component";
import { authGuard } from "../auth/guards/auth.guard";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { EditCategoryComponent } from "./edit-category/edit-category.component";

const routes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Category',
        },
        children: [
            {
                path: '',
                component: CategoryListComponent,
                canActivate: [authGuard]
            },
            {
                path: 'add',
                component: AddCategoryComponent,
                canActivate: [authGuard]
            },
            {
                path: ':id',
                component: EditCategoryComponent,
                canActivate: [authGuard]
            },
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoryListRoutingModule { }
