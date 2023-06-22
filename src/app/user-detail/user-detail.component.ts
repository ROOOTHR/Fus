import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  blog: any;
  userId!: number;
  data: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient
  ) {
  }
  clearLocalStorage() {
    this.userService.clearLocalStorage();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      console.log('UserID:', this.userId);
      this.getUser();
    });
  }
  getUser() {
    this.http.get<any>(`http://localhost:5000/api/user/${this.userId}`).subscribe(
      (data) => {
        // 将返回的数据保存到组件属性中
        this.data = data;
        console.log(this.userId)
        console.log(data)
      },
      (error) => {
        console.log(this.userId)
        console.log('Failed to load user details!');
      }
    );
  }
}
