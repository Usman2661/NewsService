import { Request, Response } from "express";
import  fs  from "fs";
import { DestroyOptions, UpdateOptions } from "sequelize/types";
import { IArticlesNewsApi } from "../interface/articlesNewsApi";
import { Article, IArticle } from "../models/article.model";
import { Source } from "../models/source.model";
import Util from "../Utils/util";

const util = new Util();

export class ArticleController {

  // Getting All articles
  public async getAllArticles(req: Request, res: Response) {
    try {
      const allArticles: IArticle[] = await Article.findAll({
        include: [
            {
                model: Source,
                as: 'source',
            }
        ]
      });
      util.sendResponse(200,allArticles,res);
    } catch (error) {
      util.sendResponse(500,{message: error.message,error:error},res);
    }
  }


  // Get a single article
  public async getSingleArticle(req: Request, res: Response) {
    try {

      const id:number =  Number(req.params.id);
      const singleArticle: IArticle = await Article.findByPk(id ,{
        include: [
            {
                model: Source,
                as: 'source',
            }
        ]
      });
    
      if (!singleArticle){
        util.sendResponse(404,{message: `article with id:${id} not found !!`},res);
      }
      else {
        util.sendResponse(200,singleArticle,res);
      }
      
    } catch (error) {
      util.sendResponse(500,{message: error.message,error:error},res);
    }

  }

  public async checkArticleExists(article: IArticlesNewsApi) {
    try {

      const checkArticle: IArticle = await Article.findOne({
        where: {
          url: article.url
        }
      });
      
      if (checkArticle){
          return true;
      }
      else { 
          return false;
      }
      
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async createArticle(article: IArticle) {
    try {

        const createArticle: IArticle = await Article.create(article);
        return createArticle;
          
    } catch (error) {
        console.log(error);
        return error;
    }
  }

}

 