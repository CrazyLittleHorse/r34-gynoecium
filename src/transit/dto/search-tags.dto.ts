import { ApiProperty } from '@nestjs/swagger';
import { TagDto } from './tag.dto';

export class SearchTagsDto {
  @ApiProperty({ type: TagDto, isArray: true })
  tags: TagDto[];
}
