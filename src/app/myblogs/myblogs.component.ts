import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit{
  private myId!: number
  data: any[] = [];
  validateForm!: UntypedFormGroup;
  currentPage = 1; // 当前页码
  pageSize = 3; // 每页显示数
  constructor(private userService: UserService, private router: Router, private http: HttpClient, private fb: UntypedFormBuilder) {
  }
  clearLocalStorage() {
    this.userService.clearLocalStorage();
  }
  getBlogs(){
    this.http.get<any>( `http://localhost:5000/api/myblogs/${this.myId}`).subscribe(
      (data) => {
        this.data = data;
        console.log(data)
      },
      (error) => {
        console.log('Failed to load blogs');
      }
    )
  }
  deleteBlog(blogId: number): void {
    if (!confirm('确定要删除该博客吗？')) return; // 确认是否删除
    console.log(blogId)
    const url = `http://localhost:5000/api/deleteblog/${blogId}`;
    this.http.delete(url).subscribe((result: any) => {
      if (result.success) {
        console.log('Delete successfully:', result.message);
        location.reload();
      } else {
        alert('Failed to delete blog');
        console.log('Failed to delete blog:', result.message);
      }
    });
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      text: [null, [Validators.required]],
    });
    this.myId = this.userService.getMyId();
    console.log(this.myId);
    this.getBlogs()
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
