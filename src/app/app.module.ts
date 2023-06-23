import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzButtonModule} from "ng-zorro-antd/button";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzListModule} from "ng-zorro-antd/list";
import {NzIconModule} from "ng-zorro-antd/icon";
// import { MenuComponent } from './menu/menu.component';
// import { CommentComponent } from './comment/comment.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import { UserDetailComponent } from './user-detail/user-detail.component';
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import { MyaccountComponent } from './myaccount/myaccount.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { MycommentsComponent } from './mycomments/mycomments.component';
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzCardModule} from "ng-zorro-antd/card";
import { WriteBlogsComponent } from './write-blogs/write-blogs.component';
import { EditBlogsComponent } from './edit-blogs/edit-blogs.component';
import {NzDividerModule} from "ng-zorro-antd/divider";

registerLocaleData(zh);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    // MenuComponent,
    // CommentComponent,
    BlogDetailComponent,
    UserDetailComponent,
    MyaccountComponent,
    MyblogsComponent,
    MycommentsComponent,
    WriteBlogsComponent,
    EditBlogsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzInputModule,
    NzFormModule,
    NzCheckboxModule,
    NzButtonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NzSelectModule,
    NzListModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzPaginationModule,
    NzDescriptionsModule,
    NzBadgeModule,
    NzDrawerModule,
    NzDatePickerModule,
    NzAvatarModule,
    NzCardModule,
    NzDividerModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
