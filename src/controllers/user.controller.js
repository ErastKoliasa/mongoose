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

  } catch (err) {
    next(err);
  }
}

export const createUser = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

export const updateUserById = async (req, res, next) => {
  try {

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

