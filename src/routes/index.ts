import { Router } from 'express';
import articleRoutes from './article';
import sourceRoutes from './source';

const routes = Router();

// Article Api
routes.use('/api/article', articleRoutes);

// Source Api
routes.use('/api/source', sourceRoutes);

export default routes;