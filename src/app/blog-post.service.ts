import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BlogPost } from './blog-post.model';
import { config } from './environment';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  readonly categoryMap: Map<string, string> = new Map([
    ['Articles', 'Article']
  ]);

  constructor(private http: HttpClient) { }
  
  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${config['apiUrl']}/~anthonydillon/wp-json/wp/v2/posts.json`, {
      responseType: 'json'
    });
  }

  getGroup(blogPost: BlogPost): string | null {
    const firstGroupId = blogPost.group[0];
    const groupData = blogPost._embedded['wp:term'].flat()
      .find(term => term.taxonomy == 'group' && term.id == firstGroupId);
    
    return groupData?.name ?? null;
  }

  getMedia(blogPost: BlogPost): string {
    return blogPost.featured_media;
  }

  getMediaTitle(blogPost: BlogPost): string | null {
    return blogPost._embedded['wp:featuredmedia']?.[0].title.rendered ?? null;
  }

  getAuthor(blogPost: BlogPost): string | null {
    const authorId = blogPost.author;
    const author = blogPost._embedded['author']
      .find(item => item.id == authorId);
    
    return author?.name ?? null;
  }

  getAuthorLink(blogPost: BlogPost): string | null {
    const authorId = blogPost.author;
    const author = blogPost._embedded['author']
      .find(item => item.id == authorId);
    
    return author?.link ?? null;
  }

  getCategory(blogPost: BlogPost): string | null {
    const firstCategoryId = blogPost.categories[0];
    const categoryData = blogPost._embedded['wp:term'].flat()
      .find(term => term.taxonomy == 'category' && term.id == firstCategoryId);
    
    return this.categoryMap.get(categoryData?.name ?? "") ?? null;
  }
}
