import {Status} from "../../Status";
import {Category} from "../../Category";

export interface UpdatePostData {
  title: string,
  content: any,
  status: Status,
  category?: Category;
}
