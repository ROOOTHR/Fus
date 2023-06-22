import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit{
  data: any[] = [];
  private myId!: number
  visible = false;
  validateForm!: UntypedFormGroup;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  submitForm(): void{
    const formData = new FormData();
    formData.append('name', this.validateForm.value.name);
    formData.append('about', this.validateForm.value.about);
    console.log(formData);
    const url = `http://localhost:5000/api/editaccount/${this.myId}`
    this.http.post(url, formData).subscribe((data: any) => {
      if (data.success) {
        console.log(data)
        console.log('Submit successfully.')
        this.router.navigate(['/myaccount']);
      } else {
        alert('Invalid name');
        console.log('Invalid name.');
      }
    });
  }
  constructor(private userService: UserService, private fb: UntypedFormBuilder, private router: Router, private http: HttpClient) {
  }
  // getMyAccount(){
  //   this.userService.getMyId().subscribe((data: any) => {
  //     this.data = data
  //     console.log(this.data);
  //
  //
  //   })
  // }
  getMyBlogs(){
    this.http.get<any>( `http://localhost:5000/api/myaccount/${this.myId}`).subscribe(
      (data) => {
        this.data = data;
        console.log(data)
      },
      (error) => {
        console.log('Failed to load blog details!');
      }
    )
  }

  clearLocalStorage() {
    this.userService.clearLocalStorage();
  }
  refreshPage(): void {
    location.reload();
  }
  ngOnInit() :void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      about: [null, [Validators.required]]
    });
    this.myId = this.userService.getMyId();
    console.log(this.myId);
    this.getMyBlogs()
  }
}
