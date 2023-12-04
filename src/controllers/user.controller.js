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

  } catch (err) {
    next(err);
  }
}

