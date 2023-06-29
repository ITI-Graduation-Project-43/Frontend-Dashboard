import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryProcessName } from 'src/app/Models/Enums/CategoryProcess';
import { CategoryType } from 'src/app/Models/Enums/CategoryType';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-update-sub-category',
  templateUrl: './add-update-sub-category.component.html',
  styleUrls: ['./add-update-sub-category.component.scss']
})
export class AddUpdateSubCategoryComponent {
  form!: FormGroup;
  headerInfo: string = '';
  name: string = '';
  id: number = 0;
  parentCategoryId!: number;
  processName!: CategoryProcessName;
  
  constructor(private fb: FormBuilder, 
    public categoryService:CategoryService,
    private dialogRef: MatDialogRef<AddUpdateSubCategoryComponent>,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.name, Validators.required],
      parentCategoryId: [this.parentCategoryId, Validators.required],
      approved: new FormControl(true),
      type: new FormControl(1)
    });
  }

  onSubmit() {
    if(this.processName == CategoryProcessName.Add){
      this.categoryService.AddCategory(this.form.value).subscribe((data)=>{
        this.categoryService.getApprovedCategories(CategoryType.SubCategory).subscribe((data:Category[])=>{
          this.categoryService.setData(data);
          this.categoryService.subCategories = data;
        })
        this.dialogRef.close();
        this.snackBar.open('Subcategory added successfully!', 'ok', {
          duration: 3000
        });
      })
    }else{
      this.form.value.id = this.id;
      this.categoryService.updateCategory(this.id, this.form.value).subscribe((data) => {
        this.categoryService.getApprovedCategories(CategoryType.SubCategory).subscribe((data: Category[]) => {
          this.categoryService.setData(data);
          this.categoryService.subCategories = data;
        });
        this.dialogRef.close();
        this.snackBar.open('SubCategory updated successfully!', 'ok', {
          duration: 3000
        });
      })
    }
    
  }

}
