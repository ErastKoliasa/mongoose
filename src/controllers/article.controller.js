import Article from '../models/article.model.js';
import User from '../models/user.model.js';

export const getArticles = async (req, res, next) => {
  try {
    const {page = 1, limit = 10, title} = req.query;
    const perPage = parseInt(limit);
    const currentPage = parseInt(page);

    const query = title ? {title: {$regex: new RegExp(title, 'i')}} : {};

    const totalArticles = await Article.countDocuments(query);
    const totalPages = Math.ceil(totalArticles / perPage);

    const articles = await Article.find(query)
    .populate({
      path: 'owner',
      select: 'fullName email age'
    })
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .exec();

    res.json({
      articles,
      currentPage,
      totalPages,
      totalArticles,
    })
  } catch (err) {
    next(err);
  }
}

export const getArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.id;

    const article = await Article.findById(articleId).populate("owner", "fullName email age");
    if(!article){
      return res.status(404).json({message: "Article not found!"});
    }
    
    res.json(article);
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
    const {title, subtitle, description, category} = req.body;
    const articleId = req.params.id;

    const article = await Article.findById(articleId);
    if(!article){
      return res.status(404).json({message: "Article not found!"});
    }

    //const userId = '656df5d75a632eb8a2dfbb39'
    if(article.owner.toString() !== userId){
      return res.status(403).json({message: "You are not the owner of this article!"})
    }

    article.title = title;
    article.subtitle = subtitle;
    article.description = description;
    article.category = category;
    article.updatedAt = Date.now();
    await article.save();

    res.json(article);
  } catch (err) {
    next(err);
  }
}

export const deleteArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.id;

    const article = await Article.findById(articleId);
    if(!article){
      return res.status(404).json({message: "Article not found!"});
    }

    //const userId = '656df5d75a632eb8a2dfbb39'
    if(article.owner.toString() !== userId){
      return res.status(403).json({message: "You are not the owner of this article!"})
    }

    const owner = await User.findById(article.owner);
    if(owner){
      owner.numberOfArticles -= 1;
      await owner.save();
    }

    await article.deleteOne();
    res.json({message: "Article deleted successfully!"});
  } catch (err) {
    next(err);
  }
}
