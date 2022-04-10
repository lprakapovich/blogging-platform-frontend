import {Pipe, PipeTransform} from "@angular/core";

@Pipe({ name: 'postContentLength'})
export class PostContentLengthPipe implements PipeTransform {

  private maxContentLength = 500;

  transform(postContent: string): any {
    if (!postContent)
      return '';

    let paragraph = Array.from(postContent.split('<br>')).find(slice => !!slice);
    return paragraph && paragraph?.length > this.maxContentLength ?
      `${paragraph?.slice(0, this.maxContentLength)}..` :
      paragraph;
  }
}
