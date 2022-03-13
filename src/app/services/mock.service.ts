import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  getBlogs() {
    return [
      {id: '1lpa', name: 'Lizaveta Prakapovich', description: 'descr', publications: []},
      {id: '2lpa', name: 'Lizaveta Prakapovich', description: 'descr', publications: []},
      {id: '3lpa', name: 'Lizaveta Prakapovich', description: 'descr', publications: []},
      {id: '4lpa', name: 'Lizaveta Prakapovich', description: 'descr', publications: []}
      ];
  }

  getPosts() {
    return [
      {id: '1', blogId: 'lprakapoich1', title: '1st day of the war', author: "", content: ""},
      {id: '2', blogId: 'lprakapoich2', title: '2nd day of the war', author: "", content: ""},
      {id: '3', blogId: 'lprakapoich3', title: '3rd day of the war', author: "", content: ""},
      {id: '4', blogId: 'lprakapoich4', title: '4th day of the war', author: "", content: ""},
      {id: '5', blogId: 'lprakapoich5', title: '5th day of the war', author: "", content: ""},
      {id: '6', blogId: 'lprakapoich6', title: '6th day of the war', author: "", content: ""},
      {id: '7', blogId: 'lprakapoich7', title: '7th day of the war', author: "", content: ""},
      {id: '8', blogId: 'lprakapoich8', title: '8th day of the war', author: "", content: ""}
    ];
  }

  constructor() {

  }
}
