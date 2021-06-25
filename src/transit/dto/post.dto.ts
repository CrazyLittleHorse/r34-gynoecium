export enum PostType {
  '.mp4' = 'video',
  '.png' = 'image',
  '.jpeg' = 'image',
  '.jpg' = 'image',
  '.gif' = 'image',
}

export interface PostDto {
  id: number;
  preview: string;
  content: string;
  contentType: PostType;
  contentHeight: number;
  contentWidth: number;
  tags: [string];
  score: number;
}
