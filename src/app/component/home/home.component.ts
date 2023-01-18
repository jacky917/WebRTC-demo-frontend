import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  errMsg: string | undefined;

  UserId: string = "";

  timer: any;

  messageForm: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    content: [null, [Validators.required]],
  });

  public posts: post[] | undefined;

  // public posts:post[] = [
  //   new post("test1","Sed nec ullamcorper enim. Sed sit amet felis dolor. Cras vehicula mauris vitae quam suscipit, sed faucibus orci dignissim. Morbi blandit tortor dui, ac posuere libero condimentum at. Donec non nulla a felis sagittis tincidunt. Aliquam a vestibulum lorem. Vestibulum ultrices dui fermentum, sodales mi porta, fermentum lectus. Nam et elit est. Nunc nunc metus, condimentum eu nibh sit amet, viverra elementum quam. Curabitur vitae ultrices ipsum. Nunc a tellus nec lacus blandit dignissim vitae quis enim. Maecenas viverra, quam sed venenatis volutpat, neque odio iaculis dui, sit amet sodales arcu nunc vestibulum odio. Vestibulum vel laoreet dui. Pellentesque vestibulum orci sit amet lacinia sagittis."),
  //   new post("admin","Proin mi ligula, tincidunt a dolor sit amet, sollicitudin vehicula risus. Quisque id nisi at tortor efficitur condimentum in id erat. Aliquam non dignissim arcu. Nulla facilisi. Duis aliquet, odio sed faucibus sodales, dui tellus feugiat ligula, in ultricies lacus enim scelerisque augue. Quisque aliquam erat ante, vitae porta tellus finibus vel. Praesent vel placerat est. Ut feugiat lorem sit amet purus porttitor fermentum. Donec elementum lacinia auctor. Etiam sem libero, ultrices at ipsum at, interdum interdum leo. Donec pulvinar lectus in nulla hendrerit sodales. Nam condimentum nulla et massa iaculis mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vel dictum erat. Morbi efficitur tortor eu mauris sollicitudin eleifend."),
  //   new post("test1","Aenean pharetra at justo vel lacinia. Nam nec eleifend purus, a vulputate massa. Aenean non turpis ut quam hendrerit scelerisque. Donec id dui auctor, consequat dui ac, consequat leo. Praesent ante tortor, finibus id lorem vel, aliquam imperdiet tortor. Fusce eget placerat dui. Vivamus eu nisl metus. Praesent vel facilisis lacus, quis feugiat eros. Vestibulum id justo nibh. Praesent nec quam aliquet, congue metus ut, lobortis felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce ac nisl eu justo laoreet consectetur eu in magna."),
  //   new post("admin","Proin leo dui, accumsan in velit a, suscipit laoreet velit. In ut lobortis tellus. In vel consequat massa. Aenean dignissim tincidunt suscipit. Nam fringilla quam quam, eu molestie ex varius vitae. Nunc at tellus pellentesque tortor ultrices mattis eget sit amet massa. Vestibulum sed malesuada nisi. Sed dictum eros non leo varius, id tempor justo porttitor. Nulla nulla felis, faucibus ac odio nec, porttitor euismod urna. Donec a ipsum in risus facilisis molestie. Nullam sed sodales mauris. Vivamus lobortis dolor blandit lorem iaculis, in consequat massa vulputate. Suspendisse porta massa augue, ac suscipit ante accumsan a. In maximus hendrerit egestas."),
  //   new post("test1","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum, augue at venenatis consectetur, turpis quam dictum ex, sed ullamcorper est lectus sed enim. In hac habitasse platea dictumst. Aliquam tempus ex in risus mattis facilisis. Nam non interdum eros. Sed feugiat erat vel est pharetra condimentum. Nulla at lorem cursus, tempus justo sed, cursus lectus. Maecenas est massa, fringilla non augue vel, volutpat dictum quam. Cras dolor urna, ullamcorper in dapibus in, mollis venenatis leo."),
  //   new post("admin","Suspendisse sed nibh bibendum, lacinia purus in, fringilla mauris. Donec tortor ipsum, tempus in massa nec, molestie gravida tortor. Praesent pulvinar auctor turpis, tempor lacinia sapien varius sed. Etiam quis hendrerit enim. Integer sapien lacus, dapibus nec mi a, aliquam tincidunt diam. Praesent vel augue sed nibh porta sagittis efficitur vitae orci. Suspendisse condimentum justo rutrum, pharetra enim et, blandit turpis. Nullam aliquam sed odio non facilisis. Sed laoreet dui quam, a lobortis nisl maximus nec."),
  //   new post("admin","Proin pretium sollicitudin diam, at malesuada ex pellentesque tincidunt. Sed suscipit mi vel finibus ultricies. Curabitur volutpat arcu vel augue consequat eleifend. Aliquam nisi libero, volutpat eget imperdiet nec, bibendum sit amet eros. Sed non tincidunt neque, vehicula molestie lorem. Mauris volutpat massa odio, et placerat augue mattis vel. Phasellus finibus neque sed velit pretium tempor. Mauris nisi nisl, rhoncus quis lacinia dignissim, egestas non arcu. Quisque sodales, odio vitae dictum imperdiet, ex nisl luctus metus, iaculis bibendum purus dolor in felis."),
  // ]


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private data: DataService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.data.whoami().subscribe(response => {
      console.log(response)
      this.UserId = response;
    })
    // this.data.getPost()
    //   .subscribe(response => {
    //     // console.log(response);
    //     this.posts = response;
    //   });
    // //每5秒刷新1次
    // this.timer = setInterval(() => {
    //   this.data.getPost()
    //     .subscribe(response => {
    //       // console.log(response);
    //       this.posts = response;
    //     });
    // }, 5000)
  }

  //銷毀定時任務
  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  submitForm(): post[] {
    this.data.postMessage(this.messageForm.controls['title'].value, this.messageForm.controls['content'].value)
      .subscribe(response => {
        this.messageForm.reset();
        this.posts = response;
        return response;
      });
    return [];
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  // decrypt(data:string){
  //   return(this.encrypt.AES_CBC_decrypt(data));
  // }
}

export class post {
  constructor(
    public id: string,
    public name: string,
    public title: string,
    public content: string,
    public postUserId: string,
    public postCategoryId: string,
    public postTagId: string,
    public nicePost: string,
    public browseCount: string,
    public thumbsUp: string,
    public modifiedTime: string
  ) {
  }
}
