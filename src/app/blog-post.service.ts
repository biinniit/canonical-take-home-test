import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BlogPost } from './blog-post';
import { config } from './environment';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }
  
  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${config['apiUrl']}/~anthonydillon/wp-json/wp/v2/posts.json`, {
      responseType: 'json'
    });
  }

  findGroup(blogPost: BlogPost): string | null {
    const firstGroupId = blogPost.group[0];
    const groupData = blogPost._embedded['wp:term'].flat()
      .find(term => term.taxonomy == 'group' && term.id == firstGroupId);
    
    return groupData?.name ?? null;
  }
}
