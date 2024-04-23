import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard, onlyAdmin } from "../auth/guards/auth.guard";
import { BlogpostListComponent } from "./blogpost-list/blogpost-list.component";
import { AddBlogpostComponent } from "./add-blogpost/add-blogpost.component";
import { EditBlogpostComponent } from "./edit-blogpost/edit-blogpost.component";
import { MyBlogpostsComponent } from "./my-blogposts/my-blogposts.component";

const routes: Routes = [
    {
        path: '',
        component: MyBlogpostsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'admin',
        component: BlogpostListComponent,
        canActivate: [onlyAdmin]
    },
    {
        path: 'add',
        component: AddBlogpostComponent,
        canActivate: [authGuard]
    },
    {
        path: ':id',
        component: EditBlogpostComponent,
        canActivate: [authGuard]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BlogPostRoutingModule { }
