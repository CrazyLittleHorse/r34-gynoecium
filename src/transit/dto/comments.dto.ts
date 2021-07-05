import { ApiProperty } from '@nestjs/swagger';
import { CommentDto } from './comment.dto';

export class CommentsDto {
  @ApiProperty({ type: CommentDto, isArray: true })
  comments: CommentDto[];
}
