import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Instructor } from 'src/app/Models/instructor';
import { InstructorService } from 'src/app/Services/instructor.service';

@Component({
  selector: 'app-instructor-delete',
  templateUrl: './instructor-delete.component.html',
  styleUrls: ['./instructor-delete.component.sass']
})
export class InstructorDeleteComponent {
  constructor(private dialogRef: MatDialogRef<InstructorDeleteComponent>, 
    public instructorService: InstructorService) { }
  @Input() instructorFirstName!: string;
  @Input() instructorLastName!: string;
  @Input() instructorId!: string;

  delete(id: string) {
    this.instructorService.RemoveInstructor(id).subscribe((data:Instructor[])=>{
      this.instructorService.setData(data);
      console.log("deleted successfully");
    });
  }

  cancel(){
    this.dialogRef.close();
  }
}
