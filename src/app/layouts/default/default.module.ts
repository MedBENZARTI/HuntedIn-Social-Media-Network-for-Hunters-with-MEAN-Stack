import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { DefaultComponent } from './default.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreatePostComponent } from 'src/app/modules/home/create-post/create-post.component';
import { ListPostComponent } from 'src/app/modules/home/list-post/list-post.component';
import { HuntComponent } from 'src/app/modules/hunt/hunt.component';
import { CompetitionComponent } from 'src/app/modules/competition/competition.component';
import { ShopComponent } from 'src/app/modules/shop/shop.component';



@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    HuntComponent,
    CompetitionComponent,
    ShopComponent,
    CreatePostComponent,
    ListPostComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    ScrollingModule,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class DefaultModule { }
