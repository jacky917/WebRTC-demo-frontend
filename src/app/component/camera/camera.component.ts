import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {waitForAsync} from "@angular/core/testing";

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.less']
})
export class CameraComponent implements OnInit {

  constraints = {
    audio: false,
    video: {
      width: {min: 1024, ideal: 1280, max: 1920},
      height: {min: 776, ideal: 720, max: 1080}
    }
  };

  configuration = {
    "iceServers": [{
      urls: "stun:stun.l.google.com:19302"
    }]
  };

  localVideo: any;
  remoteVideo: any;
  localStream: any;
  peerConnA: any;
  peerConnB: any;

  constructor() {
  }

  // @ViewChild('video', { static: false }) video!: ElementRef;
  @ViewChild('remoteVideo') video: HTMLVideoElement | undefined;

  handleSuccess(mediaStream: MediaStream) {
    console.log(mediaStream.getVideoTracks()[0].label);
    console.log("========================")
    let video = document.querySelectorAll('video');
    if (video[0] && "srcObject" in video[0]) {
      video[0].srcObject = mediaStream;
    }
    if (video[1] && "srcObject" in video[1]) {
      video[1].srcObject = mediaStream;
    }
    console.log(this.video)
    if (this.video) {
      this.video.srcObject = mediaStream;
    }
  }


  handleError(error: any) {
    console.log(error);
    // if(error.name === 'ConstraintNotSatisfiedError')
  }

  // openCamera() {
  //   navigator.mediaDevices.getUserMedia(this.constraints)
  //     .then((mediaStream) => {
  //       this.handleSuccess(mediaStream);
  //     }, (e) => {
  //       this.handleError(e);
  //     })
  //     .catch(function (err) {
  //       console.log(err.name + ": " + err.message);
  //     });
  // }

  // async openCamera() {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
  //     this.handleSuccess(stream);
  //   }catch (e){
  //     console.log(e);
  //   }
  // }

  openCamera() {



    let video = document.querySelectorAll('video');

    this.localVideo = video[0];
    this.localStream = video[0];
    this.remoteVideo = video[1];

    navigator.mediaDevices.getUserMedia(this.constraints)
      .then((mediaStream) => {

        // let localVideo = document.getElementById("localVideo") as HTMLVideoElement;
        // if(localVideo) {
        //   localVideo.srcObject = mediaStream;
        // }

        this.localVideo.srcObject = mediaStream;
        this.localStream = mediaStream;
        // this.handleSuccess(mediaStream);
      }, (e) => {
        this.handleError(e);
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
  }

  async callCamera() {

    // let video = document.querySelectorAll('video');
    //
    // this.localVideo = video[0];
    // this.remoteVideo = video[1];
    //
    // navigator.mediaDevices.getUserMedia(this.constraints)
    //   .then((mediaStream) => {
    //     this.localVideo.srcObject = mediaStream;
    //     // this.handleSuccess(mediaStream);
    //   }, (e) => {
    //     this.handleError(e);
    //   })
    //   .catch(function (err) {
    //     console.log(err.name + ": " + err.message);
    //   });


    // let start = async () => {
    //   try{
    //     const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
    //     // // this.localVideo.srcObject = stream;
    //     // // this.localStream = stream;
    //     // // @ts-ignore
    //     // video[0].srcObject = stream;
    //     this.handleSuccess(stream);
    //   }catch (e: any){
    //     console.log(e);
    //   }
    // }

    this.peerConnA = new RTCPeerConnection(this.configuration);
    this.peerConnA.addEventListener('icecandidate', this.onIceCandidateA)

    this.peerConnB = new RTCPeerConnection(this.configuration);
    this.peerConnB.addEventListener('icecandidate', this.onIceCandidateB)

    this.peerConnA.addEventListener('iceconnectionstatechange', this.onIceStateChangeA)
    this.peerConnB.addEventListener('iceconnectionstatechange', this.onIceStateChangeB)

    this.peerConnB.addEventListener('track', this.gotRemoteStream)

    this.localStream.getTracks().forEach((track: MediaStreamTrack) => {
      this.peerConnA.addTrack(track, this.localStream);
    });

    try {
      const offer = await this.peerConnA.createOffer();
      console.log(offer);
      console.log("!!!!!!!!!!!!!!!!!!!");
      await this.onCreateOfferSuccess(offer);
    } catch (e) {

    }
  }

  onIceCandidateA = async (event: any) => {
    console.log("onIceCandidateA");
    try {
      if (event.candidate) {
        await this.peerConnB.addIceCandidate(event.candidate);
        this.onAddIceCandidateSuccess(this.peerConnB);
      }
    } catch (e) {
      console.log(e);
    }
  }

  onIceCandidateB = async (event: any) => {
    console.log("onIceCandidateB");
    try {
      if (event.candidate) {
        await this.peerConnA.addIceCandidate(event.candidate);
        this.onAddIceCandidateSuccess(this.peerConnA);
      }
    } catch (e) {
      console.log(e);
    }
  }

  onAddIceCandidateSuccess = (pc: any) => {
    console.log("onAddIceCandidateSuccess");
  }

  onIceStateChangeA = (event: any) => {
    console.log("onIceStateChangeA");
  }

  onIceStateChangeB = (event: any) => {
    console.log("onIceStateChangeB");
  }


  gotRemoteStream = (e: any) => {
    console.log("gotRemoteStream");
    console.log(e);
    if (this.remoteVideo.srcObject !== e.streams[0]) {
      this.remoteVideo.srcObject = e.streams[0];
    }
  }

  onCreateOfferSuccess = async (desc: any) => {
    console.log("onCreateOfferSuccess");
    console.log(desc);
    try {
      await this.peerConnA.setLocalDescription(desc);
      this.onSetLocalSuccess(this.peerConnA);
    } catch (e) {
      console.log(e);
    }

    try {
      await this.peerConnB.setRemoteDescription(desc);
      this.onSetRemoteSuccess(this.peerConnB);
    } catch (e) {
      console.log(e);
    }

    try {
      const answer = await this.peerConnB.createAnswer(desc);
      await this.onCreateAnswerSuccess(answer);
    } catch (e) {
      console.log(e);
    }

  }

  onSetLocalSuccess = (pc: any) => {
    console.log("onSetLocalSuccess");
  }

  onSetRemoteSuccess = (pc: any) => {
    console.log("onSetRemoteSuccess");
  }

  onCreateAnswerSuccess = async (desc: any) => {
    console.log("onCreateAnswerSuccess");
    console.log(desc);
    try {
      await this.peerConnB.setLocalDescription(desc);
      this.onSetLocalSuccess(this.peerConnB);
    } catch (e) {
      console.log(e);
    }

    try {
      await this.peerConnA.setRemoteDescription(desc);
      this.onSetRemoteSuccess(this.peerConnA);
    } catch (e) {
      console.log(e);
    }
  }

  hangupCamera() {
    console.log("hangupCamera");
  }

  test(){
    console.log(this.localVideo);
    console.log(this.remoteVideo);
    console.log(this.localStream);
    console.log(this.peerConnA);
    console.log(this.peerConnB);
    console.log("=======================");
    console.log(this.peerConnA.getDescription)
    console.log(this.peerConnB.getDescription)
  }

  ngOnInit(): void {

    // if (video[0] && "srcObject" in video[0]) {
    //   video[0].srcObject = mediaStream;
    // }
    // if (video[1] && "srcObject" in video[1]) {
    //   video[1].srcObject = mediaStream;
    // }
  }
}
