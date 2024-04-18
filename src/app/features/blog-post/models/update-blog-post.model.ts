export interface UpdateBlogPost{
    title: string;
    desc: string;
    content: string;
    imageUrl: string;
    publishedDate: Date;
    lastEditedDate:Date;
    isVisible: boolean;
    category: string;
    createdBy:string;
    createdById:string;
}