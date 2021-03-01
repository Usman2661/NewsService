import { ISourceNewsApi } from "./sourceNewsApi";

export interface IArticlesNewsApi { 
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    content: string;
    publishedAt: Date;
    source: ISourceNewsApi;
}
