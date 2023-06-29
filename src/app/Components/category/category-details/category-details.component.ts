import { Component } from '@angular/core';
import { Category } from 'src/app/Models/category';
import { RemoveCategoryComponent } from '../remove-category/remove-category.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryType } from 'src/app/Models/Enums/CategoryType';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent {
  constructor(private dialogRef: MatDialogRef<RemoveCategoryComponent>){
  }
  headerInfo:string = 'Category Details';
  category!:Category;

  close() {
    this.dialogRef.close();
  }
}
