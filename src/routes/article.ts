import { Router } from 'express';
import { ArticleController } from '../controllers/articles';

const articleRoutes = Router();

const articleController = new ArticleController();

// Get All Articles
articleRoutes.get('/' , articleController.getAllArticles );
// Get Single Article by ID
articleRoutes.get('/:id' , articleController.getSingleArticle);


export default articleRoutes;