import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import en from '@angular/common/locales/en';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { MarkdownModule } from 'ngx-markdown';
import { ToastComponent } from './shared/components/toast/toast.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';
import { HomeComponent } from './features/public/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ModalComponent } from './shared/components/modal/modal/modal.component';
import { AntdDesignModule } from './shared/antd-design/antd-design-module.module';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { ComponentModule } from './shared/components/component.module';
import { RouterModule } from '@angular/router';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './features/auth/services/auth.service';
initializeApp(environment.firebaseConfig);

registerLocaleData(en);


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    NzModalModule,
    AntdDesignModule,
    BrowserAnimationsModule,
    // Firebase1Module,
    // AngularFireModule,
    // AngularFirestoreModule,
    // AngularFireModule.initializeApp(environment.firebaseProject_message, 'zenApp'),
    // AngularFireModule.initializeApp(environment.firebaseProject_notification, 'zenShop'),
    ComponentModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    MarkdownModule.forRoot(),
  ],
  providers: [
    AuthService,
    // { provide: FIREBASE_OPTIONS, useValue: environment.firebaseProject_message },
    // { provide: FIREBASE_OPTIONS, useValue: environment.firebaseProject_notification },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
