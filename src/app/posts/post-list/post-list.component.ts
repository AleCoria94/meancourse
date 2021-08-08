import { Component, Input} from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';

@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css']
}
)
export class PostListComponent{
    @Input() posts: Post[] = [];

    constructor(public postsService:PostsService){

    }
}