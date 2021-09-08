import { Post } from './post.model'
import { HttpClient } from "@angular/common/http";
import { Subject} from 'rxjs'
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// Esto es equivalente a importar PostService en el array de providers en app.module.ts//
@Injectable({providedIn:'root'})
export class PostsService{
    private posts: Post[]= [];
    private postsUpdated= new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts(){
        this.http
        .get<{ message: string; posts: any }>(
          "http://localhost:3000/api/posts"
        )
        .pipe(map((postData) => {
          return postData.posts.map(post =>{
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };    
        });
      }))
        .subscribe(transformedData => {
          this.posts = transformedData;
          this.postsUpdated.next([...this.posts]);
        });
    }
    getPostUpdatedListener(){
        return this.postsUpdated.asObservable();
    }


    
    addPost(title:string,content:string){
       const post: Post = {_id:null,title:title, content:content};
       this.http
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        console.log(responseData.message);
       this.posts.push(post);
       this.postsUpdated.next([...this.posts]);
    });
    }
}