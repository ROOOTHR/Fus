import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {NzFormTooltipIcon} from "ng-zorro-antd/form";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  submitForm(): void {
    const formData = new FormData();
    formData.append('username', this.validateForm.value.username);
    formData.append('password', this.validateForm.value.password);
    formData.append('name', this.validateForm.value.name)
    console.log(formData);
    const url = 'http://localhost:5000/api/register'
    this.http.post(url, formData).subscribe((data: any) => {
      if (data.success) {
        this.router.navigate(['/login']);
        console.log('Login successfully.');
      } else {
        alert('Invalid username or password');
        console.log('Invalid username or password.');
      }
    });
    // if (this.validateForm.valid) {
    //   console.log('submit', this.validateForm.value);
    // } else {
    //   Object.values(this.validateForm.controls).forEach(control => {
    //     if (control.invalid) {
    //       control.markAsDirty();
    //       control.updateValueAndValidity({ onlySelf: true });
    //     }
    //   });
    // }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: UntypedFormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]]
    });
  }
}
