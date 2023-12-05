import { Router } from 'express';
import {
  createArticle,
  updateArticleById,
  deleteArticleById,
  getArticles,
  getArticleById,
  getUserWhoLikedArticle,
} from '../controllers/article.controller.js';

const articleRouter = Router();

articleRouter
  .get('/', getArticles)
  .get('/:id', getArticleById)
  .get('/:articleId/liked-user', getUserWhoLikedArticle)
  .post('/', createArticle)
  .put('/:id', updateArticleById)
  .delete('/:id', deleteArticleById);

export default articleRouter;
