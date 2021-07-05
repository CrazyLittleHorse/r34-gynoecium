import { SearchTagsDto } from './dto/search-tags.dto';
import { CommentsDto } from './dto/comments.dto';
import { PostsDto } from './dto/posts.dto';
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransitService } from './transit.service';

@Controller('transit')
export class TransitController {
  constructor(private readonly transitService: TransitService) {}

  @ApiTags('Posts')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get post by id',
    type: PostsDto,
  })
  @ApiParam({ name: 'id', type: Number, required: true })
  @Get('post/:id')
  post(@Param('id') id: number) {
    return this.transitService.getPosts({ id });
  }

  @ApiTags('Posts')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Posts list by queries',
    type: PostsDto,
  })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'pid', type: Number, required: false })
  @ApiQuery({ name: 'tags', type: String, required: false })
  @ApiQuery({ name: 'id', type: Number, required: false })
  @Get('posts')
  posts(
    @Query('limit') limit?: number,
    @Query('pid') pid?: number,
    @Query('tags') tags?: string,
    @Query('id') id?: number,
  ) {
    return this.transitService.getPosts({ limit, pid, tags, id });
  }

  @ApiTags('Comments')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comments by post id',
    type: CommentsDto,
  })
  @ApiQuery({ name: 'post_id', type: Number, required: true })
  @Get('comments')
  comments(@Query('post_id') postId: number) {
    return this.transitService.getComments(postId);
  }

  @ApiTags('Tags')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tags by query',
    type: SearchTagsDto,
  })
  @ApiQuery({ name: 'q', type: String, required: true })
  @Get('tags')
  tags(@Query('q') q?: string) {
    return this.transitService.searchTags(q);
  }
}
