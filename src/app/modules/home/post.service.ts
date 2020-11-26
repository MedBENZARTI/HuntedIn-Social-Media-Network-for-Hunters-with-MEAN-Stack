import { Injectable } from '@angular/core';
import { Post } from "./post.model";
import { Subject } from "rxjs"; //like an event emmiter
import { map } from "rxjs/operators"; //like an event emmiter
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            subtitle: post.subtitle,
            src: post.src,
            alt: post.alt,
            content: post.content,
            comments: post.comments,
            id: post._id
          };
        });
      }))
      .subscribe((transformedPost) => {
        this.posts = transformedPost;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable(); // return an object to which we can listen but that we can't emmit
  };

  addPost(title: string, subtitle: string, src: string, alt: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      subtitle: subtitle,
      src: src,
      alt: alt,
      content: content,
      comments: []
    };

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        post.id = responseData.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]) // emetts a copy of my posts after updating it
      });
  };

  addComment(id: string, newcomment: string) {
    const ourpost: Post = this.posts.filter(post => post.id === id)[0];

    const postWithNewCom = {
      post: ourpost,
      newcomment: newcomment
    };
    this.http.post('http://localhost:3000/api/posts/' + id, postWithNewCom).subscribe(() => {
      console.log('done');
    })
  }
  constructor(private http: HttpClient) { }
}
