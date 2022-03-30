import {BlogPost} from "./BlogPost";

export interface Blog {
  id: BlogId,
  displayName: string;
  description: string;
  publications: BlogPost[]
}

export type BlogId = {
  id: string;
  username: string;
}

