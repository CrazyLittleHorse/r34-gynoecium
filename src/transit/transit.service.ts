import { HttpService, Injectable } from '@nestjs/common';
import { PostsDto } from './dto/posts.dto';
import { ContentType } from './enums/content-type.enum';
import * as convert from 'xml-js';
import { PostDto, PostType } from './dto/post.dto';
import * as path from 'path';
import { SearchTagsDto } from './dto/search-tags.dto';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TransitService {
  constructor(private readonly httpService: HttpService) {}

  private generateURL(
    contentType: ContentType,
    queries: {
      limit?: number;
      pid?: number;
      tags?: string;
      id?: 'number';
    },
  ): string {
    let url = `https://rule34.xxx//index.php?page=dapi&s=${contentType}&q=index`;

    if (contentType === ContentType.post) {
      if (queries.limit) {
        url += `&limit=${queries.limit}`;
      }
      if (queries.pid) {
        url += `&pid=${queries.pid}`;
      }
      if (queries.tags) {
        url += `&tags=${queries.tags}`;
      }
      if (queries.id) {
        url += `&id=${queries.id}`;
      }
    }
    return url;
  }

  private getContentType(contentUrl: string): PostType {
    const contentExt = path.parse(contentUrl).ext;
    return PostType[contentExt];
  }

  private mapPost(post): PostDto {
    const postType = this.getContentType(post.file_url);
    const postDto: PostDto = {
      id: Number.parseInt(post.id),
      preview: post.preview_url,
      content: postType === 'image' ? post.sample_url : post.file_url,
      contentType: postType,
      tags: post.tags.split(' '),
      score: Number.parseInt(post.score),
    };
    return postDto;
  }

  private mapPosts(data: string): PostsDto {
    const convertedData = JSON.parse(
      convert.xml2json(data, { compact: true, spaces: 4 }),
    );

    const posts = convertedData.posts.post;
    const postsDto: PostsDto = { posts: [] };

    if (posts === undefined) {
      return postsDto;
    }

    if (posts.length === undefined) {
      const post = posts['_attributes'];
      postsDto.posts.push(this.mapPost(post));
      return postsDto;
    }

    for (let index = 0; index < posts.length; index++) {
      const post = posts[index]['_attributes'];
      postsDto.posts.push(this.mapPost(post));
    }

    return postsDto;
  }
  async getPosts(queries: {
    limit?: number;
    pid?: number;
    tags?: string;
  }): Promise<PostsDto> {
    const url = this.generateURL(ContentType.post, queries);
    const res = await this.httpService.get(url).toPromise();
    const mappedData: PostsDto = this.mapPosts(res.data);
    return mappedData;
  }

  parsePostCount(rawTag: string): number {
    const postCount: number = +/\d+/.exec(rawTag);
    return postCount;
  }

  mapTag(tag: { label: string; value: string }): TagDto {
    const tagDto: TagDto = {
      name: tag.value,
      postCount: this.parsePostCount(tag.label),
    };
    return tagDto;
  }

  mapTags(tags: [{ label: string; value: string }]): SearchTagsDto {
    const tagsDto: SearchTagsDto = { tags: [] };
    tags.forEach((tag) => {
      const tagDto: TagDto = this.mapTag(tag);
      tagsDto.tags.push(tagDto);
    });
    return tagsDto;
  }

  async searchTags(q = ''): Promise<SearchTagsDto> {
    const tags = await this.httpService
      .get(`https://rule34.xxx/autocomplete.php?q=${q}`)
      .toPromise();
    const tagsDto: SearchTagsDto = this.mapTags(tags.data);
    return tagsDto;
  }
}
