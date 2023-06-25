import { Component, Input, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Instructor } from '../../../models/instructor';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.css'],
})
export class InstructorDetailsComponent {
  constructor(private dialogRef: MatDialogRef<InstructorDetailsComponent>) {}
  @Input() instructor!: Instructor;
  close() {
    this.dialogRef.close();
  }
}
