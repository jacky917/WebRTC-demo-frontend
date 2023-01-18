import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Res} from "./auth.service";
import {post} from "../component/home/home.component";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  whoami(): Observable<string>{
    return this.http.get<string>("/api/pub/whoami")
      .pipe(map(response => {
        // @ts-ignore
        return response['data'];
      }));
  }

  getPost(): Observable<post[]> {
    return this.http.get<post[]>("/api/sysmgr/posts", {
      headers: new HttpHeaders({
        Authorization: localStorage.hasOwnProperty('access_token') !== null ? localStorage.getItem('access_token')! : ""
      })
    })
      .pipe(map(response => {
        // @ts-ignore
        return response['data'];
      }));
  }


  postMessage(title: string, content: string): Observable<post[]> {
    return this.http.post<post[]>("/api/sysmgr/posts", {title, content}, {
      headers: new HttpHeaders({
        Authorization: localStorage.hasOwnProperty('access_token') !== null ? localStorage.getItem('access_token')! : ""
      })
    })
      .pipe(map(response => {
        // @ts-ignore
        return response['data'];
      }));
  }
}
