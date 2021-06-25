import { Controller, Get, Param, Query } from '@nestjs/common';
import { TransitService } from './transit.service';

@Controller('transit')
export class TransitController {
  constructor(private readonly transitService: TransitService) {}

  @Get('post/:id')
  post(@Param('id') id: number) {
    return this.transitService.getPosts({ id });
  }

  @Get('posts')
  posts(
    @Query('limit') limit?: number,
    @Query('pid') pid?: number,
    @Query('tags') tags?: string,
    @Query('id') id?: number,
  ) {
    return this.transitService.getPosts({ limit, pid, tags, id });
  }

  @Get('comments')
  comments(@Query('post_id') postId: number) {
    return this.transitService.getComments(postId);
  }

  @Get('tags')
  tags(@Query('q') q?: string) {
    return this.transitService.searchTags(q);
  }
}
