import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  postId: number;
  @ApiProperty()
  content: string;
  @ApiProperty()
  author: string;
  @ApiProperty()
  authorId: number;
  @ApiProperty()
  createdAt: string;
}
