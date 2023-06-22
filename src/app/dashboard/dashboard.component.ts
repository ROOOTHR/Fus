import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {forkJoin, map, switchMap} from "rxjs";

interface Blog {
  blog_create_time: string;
  blog_user_id: number;
  blogid: number;
  blogtext: string;
  blogtitle: string;
  user?: User;

}
interface User {
  username: string;
  password: string;
  id: number;
  about: string
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  currentPage = 1; // 当前页码
  pageSize = 7; // 每页显示的博客数
  data: any[] = [];



  constructor(private userService: UserService, private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.get_blog_user()
  }

  get_blog_user(){
    this.userService.getData4().subscribe( (data :any[]) => {
      this.data = data
      console.log(this.data);
    })
  }
  clearLocalStorage() {
    this.userService.clearLocalStorage();
  }


  getCurrentPageBlogs() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    return this.data.slice(startIndex, endIndex);
  }


  // 处理页码点击事件
  onPageClick(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
