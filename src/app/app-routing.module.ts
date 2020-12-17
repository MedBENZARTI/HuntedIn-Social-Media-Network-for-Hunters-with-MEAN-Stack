import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuaard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { DefaultComponent } from './layouts/default/default.component';
import { ProfilePageComponent } from './layouts/profile-page/profile-page.component';
import { CompetitionComponent } from './modules/competition/competition.component';
import { CreatePostComponent } from './modules/home/create-post/create-post.component';
import { HomeComponent } from './modules/home/home.component';
import { HuntComponent } from './modules/hunt/hunt.component';
import { ShopComponent } from './modules/shop/shop.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: 'home',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'hunt',
        component: HuntComponent,
      },
      {
        path: 'newpost',
        component: TestComponent,
        canActivate: [AuthGuaard],
      },
      {
        path: 'competition',
        component: CompetitionComponent,
      },
      {
        path: 'shop',
        component: ShopComponent,
      },
    ],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    children: [
      {
        path: 'home',
        component: DefaultComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: [AuthGuaard],
})
export class AppRoutingModule {}
