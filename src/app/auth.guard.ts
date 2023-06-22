import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {UserService} from "./user.service";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService, private http: HttpClient ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = 'http://localhost:5000/api/login'
    console.log(localStorage)
    console.log(localStorage.getItem('isLoggedIn'))
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // return true;
    if (state.url === '/login') {
      if (isLoggedIn) {
        // 如果已经登录，自动跳转到dashboard
        return this.router.parseUrl('/dashboard');
      } else {
        // 如果未登录，允许访问login路由
        return true;
      }
    } else if (state.url === '/dashboard') {
      if (isLoggedIn) {
        // 如果已经登录，允许访问dashboard路由
        return true;
      } else {
        // 如果未登录，自动跳转到login
        return this.router.parseUrl('/login');
      }
    } else {
      // 如果需要保护的是其他路由，则先判断是否已登录
      if (isLoggedIn) {
        return true;
      } else {
        // 如果未登录，自动跳转到login
        return this.router.parseUrl('/login');

        // this.router.navigate(['/login']);
        // return false;
      }


    }}}
