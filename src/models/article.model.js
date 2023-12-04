import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 5, maxlength: 400, trim: true},
    subtitle: {type: String, minlength: 5, trim: true},
    description: {type: String, required: true, minlength: 5, maxlength: 500},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    category: {type: String, enum: ['sport', 'games', 'history'], required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
