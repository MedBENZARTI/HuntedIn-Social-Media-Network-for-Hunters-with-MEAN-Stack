import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponent } from '../home.component';
import { PostService } from '../post.service';
import { mimeType } from './mime-type.validator';
// import { ListPostComponent } from '../list-post/list-post.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  form: FormGroup;
  ImagePreview: string;

  constructor(public postService: PostService) {}

  ngOnInit() {
    this.form = new FormGroup({
      content: new FormControl(null, { validators: [Validators.minLength(3)] }),
      image: new FormControl(null, { validators: [Validators.required] }),
      // { asyncValidators: mimeType }
      // we can add Validators.required to the validators array but after saving the post it asks for content in the text area
    });
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
  }
}
