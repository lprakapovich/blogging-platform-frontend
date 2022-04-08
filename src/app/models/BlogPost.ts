import {Blog} from "./Blog";
import {Category} from "./Category";
import {Status} from "./Status";

export interface BlogPost {
  id: number;
  title: string;
  content: any;
  category?: Category;
  status: Status;
  blog: Blog;
  createdDateTime?: Date;
  updatedDateTime?: Date;
}
