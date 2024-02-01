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
    })
  }
}
