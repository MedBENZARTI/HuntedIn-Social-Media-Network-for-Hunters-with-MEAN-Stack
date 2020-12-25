import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
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
  userIsAuthenticated = false;
  userId: string;
  user: User;

  private authListenerSubs: Subscription;

  constructor(
    public postsService: PostService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.user = {
      id: '',
      firstName: '',
      lastName: '',
      discipline: '',
      email: '',
      password: '',
    };
    if (this.authService.getIsAuth()) {
      this.user = this.authService.getUser();
    }
    this.postsService.getPosts();
    // Subscribe() takes 3 args
    // 1/ a function that gets executed whenever new data is emitted
    this.postsSubsciption = this.postsService
      .getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts.reverse();
      });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.user = this.authService.getUser();
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
    this.authListenerSubs.unsubscribe();
  }
}
