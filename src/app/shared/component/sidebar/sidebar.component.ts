import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { CreatePostComponent } from 'src/app/modules/home/create-post/create-post.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(public dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {}

  openDialog() {
    if (this.authService.getIsAuth()) {
      this.dialog.open(CreatePostComponent);
    }
  }
}
