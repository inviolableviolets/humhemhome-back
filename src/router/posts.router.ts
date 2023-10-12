import { Router as createRouter } from 'express';
import { PostsController } from '../controller/posts.controller.js';
import { FilesInterceptor } from '../middleware/files.interceptor.js';
import { PostsRepository } from '../repository/posts.repository.js';

const repository = new PostsRepository();
const postsController = new PostsController(repository);
const filesInterceptor = new FilesInterceptor();
export const postsRouter = createRouter();

postsRouter.get('/', postsController.getAll.bind(postsController));
postsRouter.get('/:id', postsController.getById.bind(postsController));
postsRouter.post(
  '/addPost/',
  filesInterceptor.singleFileStore('images').bind(filesInterceptor),
  postsController.register.bind(postsController)
);
postsRouter.patch('/update/:id', postsController.update.bind(postsController));
postsRouter.delete('/:id', postsController.delete.bind(postsController));
