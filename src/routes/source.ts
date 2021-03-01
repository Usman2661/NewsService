import { Router } from 'express';
import { SourceController } from '../controllers/source';

const sourceRoutes = Router();

const sourceController = new SourceController();

// Get All sources
sourceRoutes.get('/', sourceController.getAllSources);
// Get Single source by ID
sourceRoutes.get('/:id', sourceController.getSingleSource);


export default sourceRoutes;