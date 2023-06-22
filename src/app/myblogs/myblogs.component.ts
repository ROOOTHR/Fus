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
    if (!confirm('确定要删除该博客吗？')) return; // 确认是否删除该评论
    console.log(blogId)
    const url = `http://localhost:5000/api/deleteblog/${blogId}`;
    this.http.delete(url).subscribe((result: any) => {
      if (result.success) {
        console.log('Delete successfully:', result.message);
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
}
