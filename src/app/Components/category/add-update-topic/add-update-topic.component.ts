import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryProcessName } from 'src/app/Models/Enums/CategoryProcess';
import { CategoryType } from 'src/app/Models/Enums/CategoryType';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-add-topic',
  templateUrl: './add-update-topic.component.html',
  styleUrls: ['./add-update-topic.component.scss']
})
export class AddUpdateTopicComponent {
  form!: FormGroup;
  headerInfo: string = '';
  name: string = '';
  id: number = 0;
  parentSubCategoryId!: number;
  processName!: CategoryProcessName;


  constructor(private fb: FormBuilder,
    public categoryService: CategoryService,
    private dialogRef: MatDialogRef<AddUpdateTopicComponent>,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.name, Validators.required],
      parentSubCategoryId: [this.parentSubCategoryId, Validators.required],
      approved: new FormControl(true),
      type: new FormControl(2)
    });
  }

  onSubmit() {
    if (this.processName == CategoryProcessName.Add) {
      this.categoryService.AddCategory(this.form.value).subscribe((data) => {
        this.categoryService.getApprovedCategories(CategoryType.Topic).subscribe((data: Category[]) => {
          this.categoryService.setData(data);
        })
        this.dialogRef.close();
        this.snackBar.open('Topic added successfully!', 'ok', {
          duration: 3000
        });
      })
    } else {
      this.form.value.id = this.id;
      this.categoryService.updateCategory(this.id, this.form.value).subscribe((data) => {
        this.categoryService.getApprovedCategories(CategoryType.Topic).subscribe((data: Category[]) => {
          this.categoryService.setData(data);
        });
        this.dialogRef.close();
        this.snackBar.open('Topic updated successfully!', 'ok', {
          duration: 3000
        });
      })
    }

  }
}
