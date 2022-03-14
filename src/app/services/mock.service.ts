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

  getPostsFromSubscriptions() {
    return [
      {id: '1', blogId: 'lprakapoich', title: '1st day of the war', author: "Liza", content: "Хотя я перестала вести блог в ЖЖ в этом году, около недели назад мне прилетело поздравление. С тем, что теперь я полных 20 лет там пишу."},
      {id: '1', blogId: 'lprakapoich', title: '2nd day of the war', author: "Pavel", content: "Что делать?"},
      {id: '1', blogId: 'lprakapoich', title: '3rd day of the war', author: "Justyna", content: "Потом я подумала, что табличка - это как-то сложно. Но можно нарисовать такую наклейку. Которую можно потом приклеить и на дверь, и на ноут, и на винт и может быть еще на двери некоторых комнат. :-)"},
      {id: '1', blogId: 'lprakapoich', title: '4th day of the war', author: "Olivia", content: "Ладно. Разочаровалась я до такой степени, что решила полностью пересмотреть свою концепцию, и нарисовать картинку-мельтешилку, с миллионом предметов. И на ней написать эту самую фразу. Потом я еще две недели по кусочку дорисовывала миллион мелочей. Потом немного выздоровела, и за три присеста раскрасила."},
      {id: '1', blogId: 'lprakapoich', title: '5th day of the war', author: "Martyna", content: "Ладно. И на ней написать эту самую фразу. Потом я еще две недели по кусочку дорисовывала миллион мелочей. Потом немного выздоровела, и за три присеста раскрасила."},
      {id: '1', blogId: 'lprakapoich', title: '6th day of the war', author: "Kasia", content: "Разочаровалась я до такой степени, что решила полностью пересмотреть свою концепцию, и нарисовать картинку-мельтешилку, с миллионом предметов."},
      {id: '1', blogId: 'lprakapoich', title: '7th day of the war', author: "Alexander", content: "И что вы думаете - счастья не наступило. Оказалось, что картинка слишком рябит в глазах (сюрприз)! "},
      {id: '1', blogId: 'lprakapoich', title: '8th day of the war', author: "Juliusz", content: "Теперь у меня есть паттерн (куда-нибудь сгодится, просто как паттерн), и две картинки, которые мне не до конца нравятся."},
      {id: '1', blogId: 'lprakapoich', title: '1st day of the war', author: "Liza", content: "Хотя я перестала вести блог в ЖЖ в этом году, около недели назад мне прилетело поздравление. С тем, что теперь я полных 20 лет там пишу."},
      {id: '1', blogId: 'lprakapoich', title: '2nd day of the war', author: "Pavel", content: "Что делать?"},
      {id: '1', blogId: 'lprakapoich', title: '3rd day of the war', author: "Justyna", content: "Потом я подумала, что табличка - это как-то сложно. Но можно нарисовать такую наклейку. Которую можно потом приклеить и на дверь, и на ноут, и на винт и может быть еще на двери некоторых комнат. :-)"},
      {id: '1', blogId: 'lprakapoich', title: '4th day of the war', author: "Olivia", content: "Ладно. Разочаровалась я до такой степени, что решила полностью пересмотреть свою концепцию, и нарисовать картинку-мельтешилку, с миллионом предметов. И на ней написать эту самую фразу. Потом я еще две недели по кусочку дорисовывала миллион мелочей. Потом немного выздоровела, и за три присеста раскрасила."},
      {id: '1', blogId: 'lprakapoich', title: '5th day of the war', author: "Martyna", content: "Ладно. И на ней написать эту самую фразу. Потом я еще две недели по кусочку дорисовывала миллион мелочей. Потом немного выздоровела, и за три присеста раскрасила."},
      {id: '1', blogId: 'lprakapoich', title: '6th day of the war', author: "Kasia", content: "Разочаровалась я до такой степени, что решила полностью пересмотреть свою концепцию, и нарисовать картинку-мельтешилку, с миллионом предметов."},
      {id: '1', blogId: 'lprakapoich', title: '7th day of the war', author: "Alexander", content: "И что вы думаете - счастья не наступило. Оказалось, что картинка слишком рябит в глазах (сюрприз)! "},
      {id: '1', blogId: 'lprakapoich', title: '8th day of the war', author: "Juliusz", content: "Теперь у меня есть паттерн (куда-нибудь сгодится, просто как паттерн), и две картинки, которые мне не до конца нравятся."}
    ];
  }

  constructor() {

  }

  getAllUserBlogIds() {
    return ['lprakapovich', 'lprakapovich2'];
  }
}
