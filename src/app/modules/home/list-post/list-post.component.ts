import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  posts: Post[] = [];
  postsSubsciption: Subscription;
  newcomment = '';


  constructor(public postsService: PostService) { }

  ngOnInit() {
    this.postsService.getPosts()
    // Subscribe() takes 3 args
    // 1/ a function that gets executed whenever new data is emitted
    this.postsSubsciption = this.postsService.getPostsUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts.reverse();
    });
  };

  // onDelete(postId: string) {
  //   this.postsService.deletePost(postId);
  // }

  onAddComment(id: string, newcomment: string) {
    this.postsService.addComment(id, newcomment);
    // console.log(this.newcomment);
    // console.log(id);
    // this.newcomment = '';
    // this.posts
  }
  ngOnDestroy() {
    this.postsSubsciption.unsubscribe();
  }


}
