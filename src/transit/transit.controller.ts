import { Controller, Get, Query } from '@nestjs/common';
import { TransitService } from './transit.service';

@Controller('transit')
export class TransitController {
  constructor(private readonly transitService: TransitService) {}

  @Get('post')
  post() {
    return { result: true };
  }

  @Get('posts')
  posts(
    @Query('limit') limit?: number,
    @Query('pid') pid?: number,
    @Query('tags') tags?: string,
  ) {
    return this.transitService.getPosts({ limit, pid, tags });
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
