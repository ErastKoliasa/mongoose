import Article from '../models/article.model.js';
import User from '../models/user.model.js';

export const getArticles = async (req, res, next) => {
  try {
    
  } catch (err) {
    next(err);
  }
}

export const getArticleById = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

export const createArticle = async (req, res, next) => {
  try {
    const newArticle = req.body;

    const owner = await User.findById(newArticle.owner);
    if(!owner){
      return res.status(400).json({ message: 'Owner not found.' });
    }

    const article = new Article(newArticle);
    await article.save();
    
    owner.numberOfArticles += 1;
    await owner.save();

    res.json(article);
  } catch (err) {
    next(err);
  }
}

export const updateArticleById = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

export const deleteArticleById = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}
