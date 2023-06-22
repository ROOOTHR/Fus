import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-edit-blogs',
  templateUrl: './edit-blogs.component.html',
  styleUrls: ['./edit-blogs.component.css']
})
export class EditBlogsComponent implements OnInit{
  validateForm!: UntypedFormGroup;
  blogId!: number;
  // private myId!: number
  constructor(private userService: UserService, private route: ActivatedRoute, private fb: UntypedFormBuilder,  private router: Router, private http: HttpClient ) {
  }
  submitForm(): void{
    const formData = new FormData();
    formData.append('title', this.validateForm.value.title);
    formData.append('text', this.validateForm.value.text);
    console.log(formData);
    const url = `http://localhost:5000/api/editblog/${this.blogId}`
    this.http.post(url, formData).subscribe((data: any) => {
      if (data.success) {
        console.log(data)
        console.log('Submit successfully.')
        this.router.navigate(['/myblogs']);
      } else {
        alert('Invalid name');
        console.log('Invalid name.');
      }
    });
  }
  clearLocalStorage() {
    this.userService.clearLocalStorage();
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      text: [null, [Validators.required]]
    });
    this.route.params.subscribe(params => {
      const blogId = +params['id'];
      this.blogId = blogId
      console.log('BlogID:', this.blogId);
      this.blogId = blogId;
      this.validateForm.patchValue({
        blog_id: this.blogId});
    });
  }
}
