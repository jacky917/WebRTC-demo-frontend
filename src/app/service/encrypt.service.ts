// import { Injectable } from '@angular/core';
// import * as CryptoJS from 'crypto-js';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class EncryptService {
//
//   constructor() { }
//
//   key:string = "0YVUpayReqL42F74";
//   iv:string = "1ExkRPT5nhsYxaQi";
//
//   // AES CBC模式加密
//   AES_CBC_encrypt(message:string) {
//     // utf8字符串—>WordArray對象
//     let keyHex = CryptoJS.enc.Utf8.parse(this.key);
//     let ivHex = CryptoJS.enc.Utf8.parse(this.iv);
//     let messageHex = CryptoJS.enc.Utf8.parse(message);
//     let encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
//       iv: ivHex,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//     });
//     // base64結果
//     return encrypted.toString();
//   }
//
//   // AES CBC模式解密
//   AES_CBC_decrypt(messageBase64:string) {
//     let keyHex = CryptoJS.enc.Utf8.parse(this.key);
//     let ivHex = CryptoJS.enc.Utf8.parse(this.iv);
//     let decrypt = CryptoJS.AES.decrypt(messageBase64, keyHex, {
//       iv: ivHex,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//     });
//     let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
//     return decryptedStr.toString();
//   }
// }
