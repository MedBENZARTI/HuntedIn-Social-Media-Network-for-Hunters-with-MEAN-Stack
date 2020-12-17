import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css'],
})
export class ListPostComponent implements OnInit {
  posts: Post[] = [];
  postsSubsciption: Subscription;
  newcomment = '';

  constructor(public postsService: PostService) {}

  ngOnInit() {
    this.postsService.getPosts();
    // Subscribe() takes 3 args
    // 1/ a function that gets executed whenever new data is emitted
    this.postsSubsciption = this.postsService
      .getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts.reverse();
      });
  }

  onAddComment(id: string, newcomment: string) {
    if (newcomment !== '') {
      this.postsService.addComment(id, newcomment);
      this.newcomment = '';
    } else {
      alert('comment must not be empty !!');
    }
  }

  onDeletePost(id: string) {
    this.postsService.deletePost(id);
  }

  onLikePost(id: string) {}

  ngOnDestroy() {
    this.postsSubsciption.unsubscribe();
  }
}
