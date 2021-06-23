import { HttpService, Injectable } from '@nestjs/common';
import { PostsDto } from './dto/posts.dto';
import { ContentType } from './enums/content-type.enum';
import * as convert from 'xml-js';
import { PostDto, PostType } from './dto/post.dto';
import * as path from 'path';

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
      preview: post.preview_url,
      content: postType === 'image' ? post.sample_url : post.file_url,
      type: postType,
      id: post.id,
      score: post.score,
      tags: post.tags.split(' '),
    };
    return postDto;
  }

  private mapPosts(data: string): PostsDto {
    const convertedData = JSON.parse(
      convert.xml2json(data, { compact: true, spaces: 4 }),
    );

    const posts = convertedData.posts.post;
    const postsDto: PostsDto = { posts: [] };

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
}
