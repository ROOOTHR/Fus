import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Route, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-mycomments',
  templateUrl: './mycomments.component.html',
  styleUrls: ['./mycomments.component.css']
})
export class MycommentsComponent implements OnInit{
  private myId!: number
  data: any[] = [];
  validateForm!: UntypedFormGroup;
  constructor(private userService: UserService, private route: Router, private http: HttpClient, private fb: UntypedFormBuilder,) {
  }
  clearLocalStorage() {
    this.userService.clearLocalStorage();
  }
  deleteComment(commentId: number): void {
    if (!confirm('确定要删除该评论吗？')) return; // 确认是否删除该评论
    console.log(commentId)
    const url = `http://localhost:5000/api/deletecomment/${commentId}`;
    this.http.delete(url).subscribe((result: any) => {
      if (result.success) {
        console.log('Delete successfully:', result.message);
      } else {
        alert('Failed to delete comment');
        console.log('Failed to delete comment:', result.message);
      }
    });
  }
  getComments() {
    this.http.get<any>( `http://localhost:5000/api/mycomments/${this.myId}`).subscribe(
      (data) => {
        this.data = data;
        console.log(data)
      },
      (error) => {
        console.log('Failed to load blogs');
      }
    )
  }
  ngOnInit() {


    this.myId = this.userService.getMyId();
    console.log(this.myId);
    this.getComments()
  }
}
