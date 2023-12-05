import Article from '../models/article.model.js';
import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
  try {
    const {sortBy} = req.query;
    const users = await User.find({}, 'id fullName email age').sort(sortBy);
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export const getUserByIdWithArticles = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({message: "User not found!"});
    }

    const articles = await Article.find({owner: userId}, "title subtitle createdAt");

    const userWithArticles = {
      user,
      articles
    };

    res.json(userWithArticles);
  } catch (err) {
    next(err);
  }
}

export const createUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser)
  } catch (err) {
    next(err);
  }
}

export const updateUserById = async (req, res, next) => {
  try {
    const {firstName, lastName, age} = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({message: "User not found!"});
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;
    user.fullName = `${firstName} ${lastName}`;
    user.updatedAt = Date.now();
    await user.save();

    res.json(user);
  } catch (err) {
    next(err);
  }
}

export const deleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
  
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({message: "User not found!"});
    }

    await Article.deleteMany({owner: userId});
    await user.deleteOne();
    
    res.json({message: "User deleted successfully."})
  } catch (err) {
    next(err);
  }
}

export const likeArticle = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const articleId = req.params.articleId;

    const user = await User.findById(userId);
    const article = await Article.findById(articleId);

    if (!user || !article){
      return res.status(404).json({message: "User or article not found!"})
    }

    const isLiked = user.likedArticles.includes(articleId);
    let message;

    if(isLiked){
      user.likedArticles = user.likedArticles.filter(likeArticle => likeArticle.toString() !== articleId);
      article.likes = article.likes.filter(likedUser => likedUser.toString() !== userId);
      message = 'Article unliked successfully!';
    } else{
      user.likedArticles.push(articleId);
      article.likes.push(userId);
      message = 'Article liked successfully!';
    }

    await user.save();
    await article.save();

    res.json({message: message})
  } catch(err){
    next(err)
  }
}
