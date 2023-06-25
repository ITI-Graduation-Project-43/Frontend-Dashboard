import { Component, Input, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Instructor } from '../../../models/instructor';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.scss'],
})
export class InstructorDetailsComponent {
  constructor(private dialogRef: MatDialogRef<InstructorDetailsComponent>) {}
  @Input() instructor!: Instructor;
  headerInfo: string = 'Instructor Details';
  close() {
    this.dialogRef.close();
  }
}
