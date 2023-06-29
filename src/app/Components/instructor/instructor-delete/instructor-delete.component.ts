import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Instructor } from 'src/app/Models/instructor';
import { InstructorService } from 'src/app/services/instructor.service';

@Component({
  selector: 'app-instructor-delete',
  templateUrl: './instructor-delete.component.html',
  styleUrls: ['./instructor-delete.component.scss'],
})
export class InstructorDeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<InstructorDeleteComponent>,
    private instructorService: InstructorService,
    private snackBar: MatSnackBar
  ) {}
  @Input() instructorFirstName!: string;
  @Input() instructorLastName!: string;
  @Input() instructorId!: string;
  loading: boolean = false;
  headerInfo: string = 'Delete Instructor';

  delete(id: string) {
    this.loading = true;
    this.instructorService
      .RemoveInstructor(id)
      .subscribe((data: Instructor[]) => {
        this.instructorService.setData(data);
        this.loading = false;
        this.dialogRef.close();
        this.snackBar.open('Instructor deleted successfully!', 'ok', {
          duration: 3000
        });
      }, (error)=>{
        this.snackBar.open('something went wrong!', 'ok', {
          duration: 3000
        });
        this.dialogRef.close();
      });
  }
  cancel() {
    this.dialogRef.close();
  }
}
