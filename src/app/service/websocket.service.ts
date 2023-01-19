import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Res} from "./data.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  webSocket: any = null;

  getWebSocketUrl(): Observable<string> {
    return this.http.get<Res>("/api/pub/getWebSocketUrl")
      .pipe(map((response: Res) => {
        return response['data'];
      }));
  }

  constructor(private http: HttpClient) {

    this.getWebSocketUrl().subscribe((url) =>{
      if (!this.webSocket) {
        this.webSocket = new WebSocket(url);

        // this.webSocket.onopen = () => {
        //   this.webSocket.send(JSON.stringify({command:TYPE_COMMAND_ROOM_LIST}))
        // };
        // this.webSocket.onclose = () => {
        //   console.log("Connection closed.");
        // };
        // this.webSocket.onerror = () => {
        //   console.log("websocket error");
        // };
        // this.webSocket.onmessage = handleMessage;

      }
    })


  }
}
