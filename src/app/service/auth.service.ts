import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // loginUrl = `http://${location.hostname}/api/pub/login`;

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
  }

  login(username: string, password: string): Observable<Res> {
    return this.http.post<Res>("/api/pub/login", {username, password})
      .pipe(map(response => {
        // 使用localStorage setItem 儲存 JWT
        // if (response.code == '200' && response.data) {
        //   // console.log("access_token = " + response.data.token)
        //   localStorage.setItem('user_id', response.data.id);
        //   localStorage.setItem('access_token', response.data.token);
        // }
        return response;
      }));
  }

  loggedIn(): boolean {
    // 通過鑑定在 localStorage 是否存有 access_token 來判斷是否已經登入
    // return localStorage.getItem('access_token') !== null;
    console.log(this.cookieService.get("JSESSIONID") !== null);
    return this.cookieService.get("JSESSIONID") !== null ;
  }

  logout() {
    // 退出登入抹除 JWT
    // localStorage.removeItem('access_token');
    this.cookieService.deleteAll('/', 'localhost');
  }

  getUserId() {
    return localStorage.getItem('user_id');
  }
}


export interface Res {
  result: boolean;
  code: string;
  message: string;
  data: {
    "id": string,
    "token": string
  }
}

export interface post {
  result: boolean;
  code: string;
  message: string;
  data: string
}
