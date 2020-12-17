// imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthInterceptor } from './auth/auth-interceptor';

// material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

// declarations
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { OtherComponent } from './shared/component/other/other.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { ShopComponent } from './modules/shop/shop.component';
import { HuntComponent } from './modules/hunt/hunt.component';
import { HomeComponent } from './modules/home/home.component';
import { CreatePostComponent } from './modules/home/create-post/create-post.component';
import { ListPostComponent } from './modules/home/list-post/list-post.component';
import { CompetitionComponent } from './modules/competition/competition.component';
import { ProfilePageComponent } from './layouts/profile-page/profile-page.component';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TestComponent } from './test/test.component';

// providers / services
// import { PersonService } from "./person.service";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    OtherComponent,
    SidebarComponent,
    ShopComponent,
    HuntComponent,
    HomeComponent,
    CreatePostComponent,
    ListPostComponent,
    CompetitionComponent,
    ProfilePageComponent,
    DefaultComponent,
    LoginComponent,
    SignupComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  entryComponents: [CreatePostComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
