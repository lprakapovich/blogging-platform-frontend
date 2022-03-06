import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {NavbarService} from "../../../services/navbar.service";
import {Router} from "@angular/router";
import {BlogPost} from "../../../models/BlogPost";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, AfterViewInit {

  loading: boolean = false;
  showPostPreview: boolean = false;

  posts: BlogPost[] = [
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

  constructor(private navbarService: NavbarService,
              private router: Router) {
    this.navbarService.setBlogTemplate()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.resizeAllGridItems();
  }

  ngAfterViewInit(): void {
    this.resizeAllGridItems();
  }

  ngOnInit(): void {
  }

  onSearchInputEvent($event: string) {
  }

  onEnterPressed($event: any) {
    this.router.navigate(['/search'],  { queryParams: { search: $event } })
  }

  resizeGridItem(item: any) {

    const grid = document.getElementsByClassName("feed-grid")[0];

    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));

    const rowSpan = Math.ceil((item.querySelector('.feed-grid-item-content')
      .getBoundingClientRect().height +rowGap) / (rowHeight + rowGap));

    item.style.gridRowEnd = "span "+ rowSpan;
  }

   resizeAllGridItems(){
    let allItems = document.getElementsByClassName("feed-grid-item");
    for(let x=0; x< allItems.length; x++){
      this.resizeGridItem(allItems[x]);
    }
  }

  openPostPreview(post: BlogPost) {
    if (!this.showPostPreview) {
      this.showPostPreview = true;
    }
  }
}
