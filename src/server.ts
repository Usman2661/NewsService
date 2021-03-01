import express , {Application , Request, Response , NextFunction} from 'express';
import http from 'http';
import * as bodyParser from "body-parser";
import routes from './routes';
import { database } from './models';
import { Source } from './models/source.model';
import { Article } from './models/article.model';
import { ArticleMiddleware } from './middleware/Article';
import { IArticlesNewsApi } from './interface/articlesNewsApi';
import cron from 'node-cron';
import redis from 'redis';
import { promisify } from 'util';

require('dotenv').config();

const articleMiddleware = new ArticleMiddleware();

const port = process.env.PORT || 4000;
const app: Application = express();
app.use(bodyParser.json());
const server = http.createServer(app);


server.listen(port);

console.log(`Application is running on port ${port}`);

 // test connectivity
 database.authenticate()
 .then(() => {
     console.log('Connection has been established successfully and Synchronised.');
 })
 .catch(err => {
     console.error('Unable to connect to the database:', err);
 });

Source.sync({ force: false }).then(() => console.log("Source table sychronised"));
Article.sync({ force: false }).then(() => console.log("Article table sychronised"));

const client = redis.createClient({
    host:process.env.redisHost,
    port:process.env.redisPort
});

export const GET_ASYNC = promisify(client.get).bind(client);
export const SET_ASYNC = promisify(client.set).bind(client);



// Cron task to run every 10 minutes
cron.schedule('*/10 * * * *', async function() {

    console.log('Service Runs every 10 minutes');

    try {
        const articles:IArticlesNewsApi[] = await articleMiddleware.readArticles();

        await articleMiddleware.processArticles(articles);

        const saveArticlesCache = await SET_ASYNC(
        'articles',
        JSON.stringify(articles),
        'EX',
        3600
        );
        
    } catch (error) {
        console.log(error);
    }
  });
  


// Routes for the application defined in the route/index.ts file
app.use(routes);




