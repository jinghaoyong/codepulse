export interface UpdateBlogPost{
    title: string;
    desc: string;
    content: string;
    imageUrl: string;
    publishedDate: Date;
    lastEditedDate:Date;
    isVisible: boolean;
    categories: string[];
    createdBy:string;
    createdById:string;
}