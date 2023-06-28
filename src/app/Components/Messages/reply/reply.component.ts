import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/Services/notification.service';
import { APIService } from 'src/app/shared/Services/api.service';
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;

  resieved: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private api: APIService
  ) {}
  ngOnInit(): void {
    this.resieved = this.data.key;
    this.form = this.formBuilder.group({
      emailTo: [this.resieved.email],
      emailToName: [this.resieved.name],
      emailSubject: ['MindMission Response'],
      emailBody: ['', [Validators.required]],
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      this.notification.notify('Enter Message First', 'error');
      return;
    } else {
      const mailData = this.form.value;
      console.log(mailData);

      this.api
        .addItem(`Message/reply/${this.resieved.id}`, mailData)
        .subscribe(() => {
          this.notification.notify(`Message has been sent`);
        });
    }
  }
}
