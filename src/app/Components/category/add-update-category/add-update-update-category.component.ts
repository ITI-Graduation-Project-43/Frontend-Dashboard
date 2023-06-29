import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryProcessName } from 'src/app/Models/Enums/CategoryProcess';
import { CategoryType } from 'src/app/Models/Enums/CategoryType';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-update-category',
  templateUrl: './add-update-category.component.html',
  styleUrls: ['./add-update-category.component.scss']
})
export class AddUpdateCategoryComponent {
  form!: FormGroup;
  headerInfo:string = '';
  name:string = ''
  id: number = 0;
  processName!:CategoryProcessName
  
  constructor(private fb: FormBuilder, 
    public categoryService:CategoryService,
    private dialogRef: MatDialogRef<AddUpdateCategoryComponent>,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.name, Validators.required],
      approved: new FormControl(true),
      type: new FormControl(0)
    });
  }

  onSubmit() {
    if(this.processName == CategoryProcessName.Add){
      this.categoryService.AddCategory(this.form.value).subscribe((data)=>{
        this.categoryService.getApprovedCategories(CategoryType.Category).subscribe((data:Category[])=>{
          this.categoryService.setData(data);
          this.categoryService.categories = data;
        })
        this.dialogRef.close();
        this.snackBar.open('Category added successfully!', 'ok', {
          duration: 3000
        });
      })
    }else{
      this.form.value.id = this.id;
      this.categoryService.updateCategory(this.id, this.form.value).subscribe((data)=>{
        this.categoryService.getApprovedCategories(CategoryType.Category).subscribe((data:Category[])=>{
          this.categoryService.setData(data);
          this.categoryService.categories = data;
        });
        this.dialogRef.close();
        this.snackBar.open('Category updated successfully!', 'ok', {
          duration: 3000
        });
      })
    }
  }
}
