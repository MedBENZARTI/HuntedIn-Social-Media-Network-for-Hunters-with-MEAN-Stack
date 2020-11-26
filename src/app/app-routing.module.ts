import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './layouts/default/default.component';
import { ProfilePageComponent } from './layouts/profile-page/profile-page.component';
import { CompetitionComponent } from './modules/competition/competition.component';
import { HomeComponent } from './modules/home/home.component';
import { HuntComponent } from './modules/hunt/hunt.component';
import { ShopComponent } from './modules/shop/shop.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'hunt',
      component: HuntComponent
    },
    {
      path: 'competition',
      component: CompetitionComponent
    },
    {
      path: 'shop',
      component: ShopComponent
    },
  ]
},
{
  path: 'profile',
  component: ProfilePageComponent,
  children: [{
    path: '',
    component: DefaultComponent
  },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
