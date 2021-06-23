export enum PostType {
  '.mp4' = 'video',
  '.png' = 'image',
  '.jpeg' = 'image',
  '.jpg' = 'image',
  '.gif' = 'image',
}

export interface PostDto {
  preview: string;
  content: string;
  type: PostType;
  id: 'number';
  tags: [string];
  score: number;
}
