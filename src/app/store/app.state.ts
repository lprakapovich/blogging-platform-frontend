import * as auth from './reducers/auth.reducers';
import * as blog from './reducers/blog.reducers';
import * as post from './reducers/post.reducers';

export interface AppState {
  authState: auth.AuthState;
  blogState: blog.BlogState;
  postState: post.PostState;
}
