import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SidebarComponent } from 'src/app/shared/component/sidebar/sidebar.component';
import { TestComponent } from 'src/app/test/test.component';
import { PostService } from '../post.service';
// import { mimeType } from './mime-type.validator';
// import { ListPostComponent } from '../list-post/list-post.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit, OnDestroy {
  form: FormGroup;
  ImagePreview: string;

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    public postService: PostService,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<SidebarComponent>
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      content: new FormControl(null, { validators: [Validators.minLength(3)] }),
      image: new FormControl(null, { validators: [Validators.required] }),
      // { asyncValidators: mimeType }
      // we can add Validators.required to the validators array but after saving the post it asks for content in the text area
    });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.ImagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddPost() {
    // if (this.form.invalid) {
    //   return;
    // }
    this.postService.addPost(
      null,
      null,
      null,
      null,
      this.form.value.content,
      this.form.value.image
    );
    this.form.reset();
    this.dialogRef.close();
    this.router.navigate(['/home']);
  }
  onCancel(): void {
    this.router.navigate(['/home']);
    this.dialogRef.close();
  }
}
