import {Pipe, PipeTransform} from "@angular/core";
import {Blog} from "../models/Blog";

// todo apply to all matching cases

@Pipe({ name: 'blogDisplayNamePipe'})
export class BlogDisplayNamePipePipe implements PipeTransform {

  transform(blog: Blog): string {
    return blog.displayName ? blog.displayName : blog.id.id;
  }
}
