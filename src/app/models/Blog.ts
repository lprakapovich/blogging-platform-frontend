export interface Blog {
  id: BlogId,
  displayName: string;
  description: string;
}

export class BlogId {
  id: string;
  username: string;
}


