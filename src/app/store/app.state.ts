import * as auth from './reducers/auth.reducers';
import * as blog from './reducers/blog.reducers';
import * as post from './reducers/post.reducers';
import * as category from './reducers/category.reducers';

export interface AppState {
  authState: auth.AuthState;
  blogState: blog.BlogState;
  postState: post.PostState;
  categoryState: category.CategoryState;
}
