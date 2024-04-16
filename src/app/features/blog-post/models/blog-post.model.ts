import { Category } from "../../category/models/category.model";

export interface BlogPost {
    title: string;
    desc: string;
    content: string;
    imageUrl: string;
    author: string;
    publishedDate: Date;
    lastEditedDate:Date;
    isVisible: boolean;
    categories: string[];
    createdBy:string;
    createdById:string;
}