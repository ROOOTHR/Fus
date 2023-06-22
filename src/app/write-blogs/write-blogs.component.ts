import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-write-blogs',
  templateUrl: './write-blogs.component.html',
  styleUrls: ['./write-blogs.component.css']
})
export class WriteBlogsComponent implements OnInit{
  constructor( private userService: UserService, private fb: UntypedFormBuilder, private router: Router, private http: HttpClient) {
  }
  private myId!: number
  validateForm!: UntypedFormGroup;
  clearLocalStorage() {
    this.userService.clearLocalStorage();
  }
  submitForm(): void{
    const formData = new FormData();
    formData.append('title', this.validateForm.value.title);
    formData.append('text', this.validateForm.value.text);
    console.log(formData);
    const url = `http://localhost:5000/api/writeblogs/${this.myId}`
    this.http.post(url, formData).subscribe((data: any) => {
      if (data.success) {
        console.log(data)
        console.log('Submit successfully.')
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid name');
        console.log('Invalid name.');
      }
    });
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      text: [null, [Validators.required]]
    });
    this.myId = this.userService.getMyId();
    console.log(this.myId);
  }
}
