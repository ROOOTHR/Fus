import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth.guard";
import {BlogDetailComponent} from "./blog-detail/blog-detail.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {MyaccountComponent} from "./myaccount/myaccount.component";
import {MyblogsComponent} from "./myblogs/myblogs.component";
import {MycommentsComponent} from "./mycomments/mycomments.component";
import {WriteBlogsComponent} from "./write-blogs/write-blogs.component";
import {EditBlogsComponent} from "./edit-blogs/edit-blogs.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent , canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'login', component: DashboardComponent},
  { path: 'myaccount', component: MyaccountComponent, canActivate: [AuthGuard]},
  { path: 'myblogs', component: MyblogsComponent, canActivate: [AuthGuard]},
  { path: 'mycomments', component: MycommentsComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'blog/:id', component: BlogDetailComponent, canActivate: [AuthGuard]},
  { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
  { path: 'write-blogs', component: WriteBlogsComponent, canActivate: [AuthGuard]},
  { path: 'editblogs/:id', component: EditBlogsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
