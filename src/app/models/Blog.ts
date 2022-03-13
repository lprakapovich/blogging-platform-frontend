import {BlogPost} from "./BlogPost";

export interface Blog {
  id: string,
  name: string;
  description: string;
  publications: BlogPost[]
}
