import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


interface User {
  username: string;
  password: string;
  id: string;
}

interface Blog {
  blog_create_time: string;
  blog_user_id: number;
  blogid: number;
  blogtext: string;
  blogtitle: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:4200'
  private baseUrl1 = 'http://localhost:5000/api'
  private apiUrl = 'http://localhost:5000/api/login';
  private apiUrl1 = 'http://localhost:5000/api/dashboard'
  private apiUrl2 = 'http://localhost:5000/api/user'
  private apiUrl3 = 'http://localhost:5000/api/user_blog_information'
  private apiUrl4 = 'http://localhost:5000/api/blog_user_information'
  private loginData: any;
  private myId!: number;
  constructor(private http: HttpClient) {

  }
  getData() {
    return this.http.get<any>(this.apiUrl);
  }
  getData1() {
    return this.http.get<any>(this.apiUrl1);
  }
  getData2() {
    return this.http.get<any>(this.apiUrl2);
  }
  getData3() {
    return this.http.get<any>(this.apiUrl3)
  }
  getData4() {
    return this.http.get<any>(this.apiUrl4)
  }

  getUser() {
    const data = localStorage.getItem('loginData');
    if (data) {
      this.loginData = JSON.parse(data);
      this.myId = this.loginData.user.id
      console.log(this.loginData.user.id)
    }
  }


  getLoginData(): any {
    this.getUser(); // 调用 getUser 方法获取登录信息
    return this.loginData;

  }
  getMyId(): any {
    this.getUser()
    return this.loginData.user.id

  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.baseUrl}/user/${userId}`;
    return this.http.get<User>(url);
  }
  getBlogById(blogId: number): Observable<Blog> {
    const url = `${this.baseUrl}/blog/${blogId}`;
    return this.http.get<Blog>(url);
  }
  clearLocalStorage(): void {
    localStorage.clear();
    console.log("用户数据已清空");

  }
  // getBlogDetail(): Observable<any>{
  //   return this.http.get<any>(`${this.baseUrl1}/blog/${number}`)
  // }
}
// login(credentials: any): Observable<any> {
//   return this.http.post<any>(`${this.baseUrl}/login`, credentials);
// }
//
// getUserData(): Observable<any> {
//   const headers = new HttpHeaders({
//     Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//   });
//   return this.http.get<any>(`${this.baseUrl}/dashboard`, { headers });
// }

