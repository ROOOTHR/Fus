import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: any;
  blogId!: number;
  data: any[] = [];
  visible = false;
  validateForm!: UntypedFormGroup;
  private myId!: number

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  submitForm(): void{
    const formData = new FormData();
    formData.append('comment', this.validateForm.value.comment);
    formData.append('blog_id', this.validateForm.value.blog_id);
    console.log(formData);
    const url = `http://localhost:5000/api/addcomment/${this.myId}`
    this.http.post(url, formData).subscribe((data: any) => {
      if (data.success) {
        console.log(data)
        console.log('Submit successfully.')
        // this.router.navigate(['/blog/blog.id']);
      } else {
        alert('Invalid name');
        console.log('Invalid name.');
      }
    });
  }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient,
    private fb: UntypedFormBuilder,
    private router: Router
  ) {}
  getMyAccount(){
    this.userService.getMyId().subscribe((data: any) => {
      this.data = data
      console.log(this.data);


    })
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      comment: [null, [Validators.required]],
      blog_id: null
    });
    this.myId = this.userService.getMyId();
    console.log(this.myId);
    this.route.params.subscribe(params => {
      const blogId = +params['id'];
      console.log('BlogID:', this.blogId);
      this.blogId = blogId;
      this.validateForm.patchValue({
        blog_id: this.blogId});
      this.getBlog();
    });
  }
  clearLocalStorage() {
    this.userService.clearLocalStorage();
  }
  refreshPage(): void {
    location.reload();
  }
  getBlog() {
    this.http.get<any>(`http://localhost:5000/api/blog/${this.blogId}`).subscribe(
      (data) => {
        // 将返回的数据保存到组件属性中
        this.data = data;
        console.log(this.blogId)
        console.log(data)
      },
      (error) => {
        console.log(this.blogId)
        console.log('Failed to load blog details!');
      }
    );
  }
}
