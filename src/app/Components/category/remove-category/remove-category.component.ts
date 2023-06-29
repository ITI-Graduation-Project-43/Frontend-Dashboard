import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryType } from 'src/app/Models/Enums/CategoryType';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-remove-category',
  templateUrl: './remove-category.component.html',
  styleUrls: ['./remove-category.component.scss']
})
export class RemoveCategoryComponent {
  constructor(private categoryService: CategoryService,
    private dialogRef: MatDialogRef<RemoveCategoryComponent>,
    private snackBar: MatSnackBar) { }

  @Input() categoryName: string = '';
  @Input() categoryType!: CategoryType;
  @Input() categoryId: number = 0;
  loading: boolean = false;

  headerInfo: string = `Delete Category`

  delete(id: number) {
    this.loading = true;
    this.categoryService
      .removeCategory(id)
      .subscribe((data) => {
        this.categoryService.getApprovedCategories(this.categoryType).subscribe((data: Category[]) => {
          this.categoryService.setData(data);
          this.loading = false;
          this.dialogRef.close();
          this.snackBar.open('deleted successfully!', 'ok', {
            duration: 3000
          });
          if (this.categoryType == CategoryType.Category)
            this.categoryService.categories = data;
          else
            this.categoryService.subCategories = data;
        }, (error) => {
          this.dialogRef.close();
          this.snackBar.open('something went wrong!', 'ok', {
            duration: 3000
          });
        })
      });
  }
  cancel() {
    this.dialogRef.close();
  }
}
