import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  blog = {
    authorFirstName: 'Lizaveta',
    authorLastName: 'Prakapovich',
    username: 'lprakapovich',
    description: 'ola',
    followers: [],
    following: [],
    posts: []
  }

    postOne = {
      header: 'Post header',
    }

  constructor() {

  }
}
