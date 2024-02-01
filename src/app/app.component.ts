import { BlogPostService } from './blog-post.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogPost } from './blog-post';

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

  defaultGroup = '&#91;Unknown&#93;';

  constructor(private service: BlogPostService) {
    this.loadBlogPosts();
  }

  loadBlogPosts(): void {
    this.service.getBlogPosts().subscribe({
      next: data => this.blogPosts = data
    });
  }

  findGroup(blogPost: BlogPost): string | null {
    return this.service.findGroup(blogPost) ?? this.defaultGroup;
  }
}
