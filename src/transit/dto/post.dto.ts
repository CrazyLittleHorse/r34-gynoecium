import { ApiProperty } from '@nestjs/swagger';

export enum PostType {
  '.mp4' = 'video',
  '.png' = 'image',
  '.jpeg' = 'image',
  '.jpg' = 'image',
  '.gif' = 'image',
}

export class PostDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  preview: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  contentFile: string;
  @ApiProperty({ enum: [PostType['.jpg'], PostType['.mp4']] })
  contentType: PostType;
  @ApiProperty()
  contentHeight: number;
  @ApiProperty()
  contentWidth: number;
  @ApiProperty()
  tags: [string];
  @ApiProperty()
  score: number;
}
