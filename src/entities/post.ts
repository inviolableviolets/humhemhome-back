import { WithId } from '../types/id.js';
import { Image } from '../types/image.js';

export type Post = WithId & {
  title: string;
  description: string;
  images: Image[];
};
