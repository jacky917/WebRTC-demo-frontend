import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {AuthService} from "../../service/auth.service";
// import {EncryptService} from "../../service/encrypt.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  errMsg: string | undefined;

  validateForm:FormGroup = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    // private encrypt: EncryptService
  ) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    // this.auth.login(this.encrypt.AES_CBC_encrypt(this.validateForm.controls['username'].value), this.encrypt.AES_CBC_encrypt(this.validateForm.controls['password'].value))
    //   .subscribe(response => {
    //     console.log(response);
    //     if (response["result"]) {
    //       this.validateForm.reset();
    //       this.router.navigate(['/home']);  // 登入成功跳轉
    //       // this.router.navigateByUrl('home');
    //     }
    //     this.errMsg = '登入失敗';
    //   });
    this.auth.login(this.validateForm.controls['username'].value, this.validateForm.controls['password'].value)
      .subscribe(response => {
        console.log(response);
        if (response["data"]) {
          this.validateForm.reset();
          this.router.navigate(['/home']);  // 登入成功跳轉
          // this.router.navigateByUrl('home');
        }
        this.errMsg = '登入失敗';
      });
  }
}
