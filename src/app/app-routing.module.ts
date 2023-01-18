import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CameraComponent} from "./component/camera/camera.component";
import {LoginComponent} from "./component/login/login.component";
import {NotFoundComponent} from "./component/not-found/not-found.component";
import {LoginGuard} from "./guard/login.guard";
import {HomeComponent} from "./component/home/home.component";

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'home', component:HomeComponent,canActivate:[LoginGuard]},
  {path: 'login', component:LoginComponent},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule { }
