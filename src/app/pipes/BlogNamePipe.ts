import {Pipe, PipeTransform} from "@angular/core";
import {Blog} from "../models/Blog";

@Pipe({ name: 'blogNamePipe'})
export class BlogNamePipe implements PipeTransform {
  
  transform(blog: Blog): string {
    return blog.displayName ? blog.displayName : blog.id.id;
  }
}
