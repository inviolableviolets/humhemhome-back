import { Schema, model } from 'mongoose';
import { Post } from '../entities/post.js';

const postSchema = new Schema<Post>({
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },

  images: {
    type: [
      {
        publicId: { type: String },
        width: { type: Number },
        height: { type: Number },
        format: { type: String },
        url: { type: String },
      },
    ],
  },
});

postSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const PostModel = model('Post', postSchema, 'posts');
