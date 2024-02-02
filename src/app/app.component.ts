import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BlogPost } from './blog-post.model';
import { BlogPostService } from './blog-post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'canonical-take-home-test';
  blogPosts: BlogPost[] = [];

  readonly missingData = '\u005bUnknown\u005d';
  readonly missingGroup = 'General';
  readonly missingLink = './#';

  constructor(private service: BlogPostService) {
    this.loadBlogPosts();
  }

  loadBlogPosts(): void {
    this.service.getBlogPosts().subscribe({
      next: data => this.blogPosts = data
    });
  }

  getGroup(blogPost: BlogPost): string {
    return this.service.getGroup(blogPost) ?? this.missingGroup;
  }

  getMedia(blogPost: BlogPost): string {
    return this.service.getMedia(blogPost);
  }

  getMediaTitle(blogPost: BlogPost): string {
    const mediaTitle = this.service.getMediaTitle(blogPost);
    let displayedMediaTitle = 'Media for ';
    if(mediaTitle != null) {
      displayedMediaTitle += `"${mediaTitle}" `;
    }
    return displayedMediaTitle + 'post';
  }

  getAuthor(blogPost: BlogPost): string {
    return this.service.getAuthor(blogPost) ?? this.missingData;
  }

  getAuthorLink(blogPost: BlogPost): string {
    return this.service.getAuthorLink(blogPost) ?? this.missingLink;
  }

  formatDate(blogPost: BlogPost): string {
    const date = new Date(blogPost.date);
    return Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(date);
  }

  getCategory(blogPost: BlogPost): string {
    return this.service.getCategory(blogPost) ?? this.missingData;
  }
}
