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
  comments() {
    return { result: true };
  }

  @Get('tags')
  tags() {
    return { result: true };
  }
}
