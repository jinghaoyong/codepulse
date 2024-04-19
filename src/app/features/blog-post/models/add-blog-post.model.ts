export interface AddBlogPost {
    title: string;
    desc: string;
    content: string;
    imageUrl: string;
    publishedDate: Date;
    lastEditedDate: Date;
    isVisible: boolean;
    categoryId: string;
    createdBy: string;
    createdById: string;
}