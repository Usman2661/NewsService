import { ArticleController } from "../controllers/articles";
import { SourceController } from "../controllers/source";
import { IArticlesNewsApi } from "../interface/articlesNewsApi";
import { IArticle } from "../models/article.model";
import NewsAPI  from 'newsapi';
import { GET_ASYNC } from '../server';

const apiKey = process.env.apiKey;
const newsapi = new NewsAPI(apiKey);

const articleController = new ArticleController();
const sourceController = new SourceController();


export class ArticleMiddleware {

    public async readArticles(){

        // Checking news articles in the past 1 hour from current time to get most recent news articles as sortedBy=popularity
        const dateFrom = new Date();
        dateFrom.setMinutes( dateFrom.getMinutes() - 60 );

        const dateTimeFrom = dateFrom.toISOString();
        const dateTimeTo = new Date().toISOString();

        // Initially called the API using axios but newsapi Node.js client library is available npm(newsapi)
        /*
         const apiUrl = process.env.apiUrl; 
         const articlesApiUrl = `${apiUrl}?q=apple OR bitcoin OR covid OR Machine Leaning&from=${dateTimeFrom}&to=${dateTimeTo}&pageSize=10&sortBy=popularity&apiKey=${apiKey}`;
         const articlesResponse = await axios.get(articlesApiUrl);
        */
        try {
            
            // Calling articles using the newsapi library. 
            // Calling multiple topics at the same time using OR keyword as calling 4 requests seperately can be costly (Higher API Calls)
            const articleResponse = await newsapi.v2.everything({
                q: 'apple OR covid OR bitcoin OR "Machine Learning"',
                from: dateTimeFrom,
                to: dateTimeTo,
                sortBy: 'popularity',
                pageSize: 10
              });
            
            const allArticles: IArticlesNewsApi[] = articleResponse.articles;
            return allArticles;

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    public async processArticles(articles:IArticlesNewsApi[]){
        
        let article:IArticlesNewsApi;

        for (article of articles){

            try {
            
            // Check if the article exists in the cache from last data fetch
            const articleCheckCache = await this.checkArticleCache(article);

            if (!articleCheckCache){

                // Check if article exists in the Database
                const articleExistsDb = await articleController.checkArticleExists(article);

                if (!articleExistsDb){
    
                    const sourceId:number = await sourceController.findOrCreateSource(article.source);
                   
                        const { title, description , url , publishedAt} = article;
    
                        const newArticle: IArticle = {
                            title,
                            description,
                            url,
                            publishedAt,
                            sourceId
                        }
                        
                        // Create the article
                        await articleController.createArticle(newArticle);
    
                    }
            }
         
            }
            catch (error) {
                console.log(error);
                return error;
            }
        
        }
    }

    public async checkArticleCache(article: IArticlesNewsApi){

        try {
            const cachedArticles = await GET_ASYNC('articles');

            const recent10Articles: IArticlesNewsApi[] = JSON.parse(cachedArticles);
            
            const articleFound = recent10Articles.find((articleData:IArticlesNewsApi) => articleData.url === article.url);

            if(articleFound){
                return true;
            }
            else { 
                return false;
            }

        } catch (error) {
            console.log(error);
            return false;
        }
       
         
    }   
}