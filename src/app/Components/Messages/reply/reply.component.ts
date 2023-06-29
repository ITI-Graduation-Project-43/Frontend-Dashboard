import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  mailData!: FormGroup;
  resieved: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private api: APIService,
    private dialogRef: MatDialogRef<ReplyComponent>
  ) {}
  ngOnInit(): void {
    this.resieved = this.data.key;
    this.mailData = this.formBuilder.group({
      emailTo: [this.resieved.email],
      emailToName: [this.resieved.name],
      emailSubject: ['MindMission Response'],
      emailBody: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.mailData.invalid) {
      this.notification.notify('Enter Message First', 'error');
      return;
    } else {
      const mailBody = `Dear ${this.resieved.name},
      
Thank you for reaching out to us at MindMission! We're glad to hear from you.

In regards to your message, ${this.resieved.message}. 

To answer your question, ${this.mailData.value.emailBody}.

If you have any further questions or concerns, please don't hesitate to reach out to us.

Best regards,
MindMission Support Team`;
      this.mailData.patchValue({
        emailBody: mailBody,
      });
      this.api
        .addItem(`Message/reply/${this.resieved.id}`, this.mailData.value)
        .subscribe(() => {
          this.dialogRef.close();
          this.notification.notify(`Message has been sent`);
        });
    }
  }
}
