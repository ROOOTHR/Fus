import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {UserService} from "../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  validateForm!: UntypedFormGroup;
  loginData: any = null;


  submitForm(): void {
    const formData = new FormData();
    formData.append('username', this.validateForm.value.username);
    formData.append('password', this.validateForm.value.password);
    console.log(formData);
    const url = 'http://localhost:5000/api/login';
    this.http.post(url, formData).subscribe((data: any) => {
      if (data.success) {
        this.loginData = data;
        console.log(data)
        console.log('Login page data received successfully.')
        this.router.navigate(['/dashboard']);
        localStorage.setItem('loginData', JSON.stringify(data));
        localStorage.setItem('isLoggedIn', 'true');
        console.log(localStorage)
        console.log(data);
        console.log(data)
        console.log(formData)
        console.log('Login successfully.');
      } else {
        alert('Invalid username or password');
        console.log('Invalid username or password.');
      }
    });

  }

  constructor(private fb: UntypedFormBuilder, private router: Router, private http: HttpClient, private userService: UserService) {}
  ngOnInit(): void {

    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

  }
}
