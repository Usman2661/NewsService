import { Request, Response } from "express";
import  fs  from "fs";
import { DestroyOptions, UpdateOptions } from "sequelize/types";
import { ISourceNewsApi } from "../interface/sourceNewsApi";
import { Article } from "../models/article.model";
import { Source, ISource } from "../models/source.model";
import Util from "../Utils/util";

const util = new Util();

export class SourceController {

  // Getting All sources
  public async getAllSources(req: Request, res: Response) {
    try {
      const allsources: ISource[] = await Source.findAll({
        include: [
            {
                model: Article,
                as: 'articles',
            }
        ]
      });
      util.sendResponse(200,allsources,res);
    } catch (error) {
      util.sendResponse(500,{message: error.message,error:error},res);
    }
  }


  // Get a single source
  public async getSingleSource(req: Request, res: Response) {
    try {

      const id:number =  Number(req.params.id);
      const singlesource: ISource = await Source.findByPk(id ,{
        include: [
            {
                model: Article,
                as: 'articles',
            }
        ]
      });
    
      if (!singlesource){
        util.sendResponse(404,{message: `source with id:${id} not found !!`},res);
      }
      else {
        util.sendResponse(200,singlesource,res);
      }
      
    } catch (error) {
      util.sendResponse(500,{message: error.message,error:error},res);
    }

  }

  public async findOrCreateSource(source: ISourceNewsApi) {
    try {

      const checkSource: ISource = await Source.findOne({
        where: {
          newsApiId:source.id,
          name: source.name
        }
      });

      
      if (checkSource){
          return checkSource.id;
      }
      else { 
        
        const createSource: ISource = await Source.create({
          name:source.name,
          newsApiId: source.id
        });

        return createSource.id;
      }
      
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  

  
}

 