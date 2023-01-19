import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  whoami(): Observable<string> {
    return this.http.get<Res>("/api/pub/whoami")
      .pipe(map((response: Res) => {
        return response['data'];
      }));
  }

  // createWebSocket(): Observable<string> {
  //   return this.http.get<Res>("/api/pub/getWebSocketUrl")
  //     .pipe(map((response: Res) => {
  //       return response['data'];
  //     }));
  // }

  sendMessage(websocket: WebSocket,command: string,message: string): void {
    websocket.send(JSON.stringify({command:command, message: message}))
  }

  // createWebSocketConnect(url: string): Subject<MessageEvent>{
  //   // return this.http.get<Res>("/api/pub/getWebSocketUrl")
  //   //   .pipe(map((response: Res) => {
  //   //     return response['data'];
  //   //   }));
  //   const ws = new WebSocket(url);
  //   let subject = new Subject();
  //   const observable = new Observable(obj => {
  //     obj.next("111");
  //   })
  //
  //   observable.subscribe(subject)
  // }

}

export interface Res {
  result: boolean;
  code: string;
  message: string;
  data: string
}
