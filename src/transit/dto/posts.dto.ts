import { ApiProperty } from '@nestjs/swagger';
import { PostDto } from './post.dto';

export class PostsDto {
  @ApiProperty({ type: PostDto, isArray: true })
  posts: PostDto[];
}
