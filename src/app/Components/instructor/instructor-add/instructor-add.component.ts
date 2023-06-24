import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Instructor } from 'src/app/Models/instructor';
import { InstructorService } from 'src/app/Services/instructor.service';

@Component({
  selector: 'app-instructor-add',
  templateUrl: './instructor-add.component.html',
  styleUrls: ['./instructor-add.component.scss']
})
export class InstructorAddComponent implements OnInit {
  form!: FormGroup;
  newInstructor!:Instructor;

  constructor(private formBuilder: FormBuilder,
    private instructorService:InstructorService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    this.newInstructor = this.form.value as Instructor;
    console.log(this.newInstructor);
    this.instructorService.AddInstructor(this.newInstructor).subscribe(()=>{
      this.instructorService.getAllInstructors().subscribe((data=>{
        this.instructorService.setData(data);
      }))
    });
  }
}
