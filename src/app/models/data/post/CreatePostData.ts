import {Category} from "../../Category";

export interface CreatePostData {
  title: string;
  content: any;
  category?: Category;
  status: string;
}
