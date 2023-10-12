import { NextFunction, Request, Response } from 'express';
import { Post } from '../entities/post.js';
import { PostsRepository } from '../repository/posts.repository.js';
import { CloudinaryService } from '../services/media.files.js';
import { HttpError } from '../types/error.js';
import { Controller } from './controller.js';

export class PostsController extends Controller<Post> {
  cloudinary: CloudinaryService;
  constructor(protected repository: PostsRepository) {
    super(repository);
    this.cloudinary = new CloudinaryService();
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new HttpError(417, 'Expectation failed', 'Not received a photo');
      }

      const newPath = req.file.destination + '/' + req.file.filename;
      const postPhotos = await this.cloudinary.uploadPhoto(newPath);
      req.body.images = postPhotos;

      const newPost = await this.repository.create(req.body);

      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params)
        throw new HttpError(404, 'Bad request', 'Not coincidence with id');
      const updatedPost = await this.repository.update(req.params.id, req.body);
      res.status(200);
      res.json(updatedPost);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.repository.delete(id);
      res.json({});
      res.status(204);
    } catch (error) {
      next(error);
    }
  }
}
