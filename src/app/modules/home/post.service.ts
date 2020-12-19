import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs'; //like an event emmiter
import { map } from 'rxjs/operators'; //like an event emmiter
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          console.log(postData);

          return postData.posts.map((post) => {
            return {
              title: post.title,
              subtitle: post.subtitle,
              src: post.src,
              alt: post.alt,
              content: post.content,
              comments: post.comments,
              id: post._id,
              imagePath: post.imagePath,
              creator: post.creator,
            };
          });
        })
      )
      .subscribe((transformedPost) => {
        this.posts = transformedPost;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable(); // return an object to which we can listen but that we can't emmit
  }

  addPost(
    title: string,
    subtitle: string,
    src: string,
    alt: string,
    content: string,
    image: File
  ) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('subtitle', subtitle);
    postData.append('src', src);
    postData.append('alt', alt);
    postData.append('content', content);
    postData.append('image', image);

    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe((responseData) => {
        // const post: Post = {
        //   id: responseData.post.id,
        //   title: title,
        //   subtitle: subtitle,
        //   src: responseData.post.imagePath,
        //   imagePath: responseData.post.imagePath,
        //   alt: alt,
        //   content: content,
        //   comments: [],

        // };
        const post: Post = {
          ...responseData.post,
          comments: [],
        };

        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]); // emetts a copy of my posts after updating it
      });
    this.router.navigate(['/home']);
  }

  addComment(id: string, newcomment: string) {
    var ourpost: Post = this.posts.filter((post) => post.id === id)[0];
    ourpost.comments.push(newcomment);

    this.http
      .put('http://localhost:3000/api/posts/' + id, ourpost)
      .subscribe((response) => {
        console.log(response);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  constructor(private http: HttpClient, public router: Router) {}
}
