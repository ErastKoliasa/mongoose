import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, minlength: 4, maxlength: 50,  trim: true},
    lastName: {type: String, required: true, minlength: 3, maxlength: 60, trim: true},
    fullName: String,
    email: {type: String, required: true, unique: true, lowercase: true},
    role: {type: String, enum: ['admin', 'writer', 'guest']},
    age: {type: Number, min: 1, max: 99, default: 1},
    numberOfArticles: {type: Number, default: 0},
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
});

userSchema.pre('save', function (next) {
    this.fullName = `${this.firstName} ${this.lastName}`;
    next();
  });
  
  userSchema.pre('save', function (next) {
    if (this.age < 0) {
      this.age = 1;
    }
    next();
  });

const User = mongoose.model('User', userSchema);

export default User;
