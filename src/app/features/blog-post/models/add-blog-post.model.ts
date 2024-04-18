export interface AddBlogPost {
    title: string;
    desc: string;
    content: string;
    imageUrl: string;
    author: string;
    publishedDate: Date;
    lastEditedDate:Date;
    isVisible: boolean;
    category: string;
    createdBy:string;
    createdById:string;
}