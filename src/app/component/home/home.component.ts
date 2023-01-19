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

  UserId: string = "";

  OnlineUsers: Array<string> = [];

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
    // this.data.getWebSocketUrl().subscribe(response => {
    //   console.log(response)
    // })

    let list :Array<number> = [1,2,3,4,5];

    list.map((data) =>{
      console.log(data)
    })

  }

  ngOnDestroy() {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  // decrypt(data:string){
  //   return(this.encrypt.AES_CBC_decrypt(data));
  // }
}
