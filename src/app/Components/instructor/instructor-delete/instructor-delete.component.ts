import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InstructorService } from 'src/app/Services/instructor.service';

@Component({
  selector: 'app-instructor-delete',
  templateUrl: './instructor-delete.component.html',
  styleUrls: ['./instructor-delete.component.sass']
})
export class InstructorDeleteComponent {
  constructor(private dialogRef: MatDialogRef<InstructorDeleteComponent>, public service: InstructorService) { }
  @Input() instructorName!: string;
  @Input() instructorId!: string;

  delete(id: string) {

  }
}
