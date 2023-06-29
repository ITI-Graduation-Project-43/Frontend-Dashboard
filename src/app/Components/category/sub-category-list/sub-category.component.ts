import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Category } from 'src/app/Models/category';
import { Observer } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { SubCategoryDataSource } from './sub-category-datasource';
import { CategoryType } from 'src/app/Models/Enums/CategoryType';
import { RemoveCategoryComponent } from '../remove-category/remove-category.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { CategoryProcessName } from 'src/app/Models/Enums/CategoryProcess';
import { AddUpdateSubCategoryComponent } from '../add-update-sub-category/add-update-sub-category.component';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  openUpdateDialog(name:string, id:number, parentCategoryId:number) {
    const dialogRef = this.dialog.open(AddUpdateSubCategoryComponent);
    dialogRef.componentInstance.name = name;
    dialogRef.componentInstance.headerInfo = 'Update Topic';
    dialogRef.componentInstance.processName = CategoryProcessName.Update;
    dialogRef.componentInstance.parentCategoryId = parentCategoryId;
    dialogRef.componentInstance.id = id;
  }

  openDetailsDialog(category: Category) {
    const dialogRef = this.dialog.open(CategoryDetailsComponent);
    category.type = CategoryType[category.type];
    category.parentSubCategoryName = "-";
    dialogRef.componentInstance.category = category;
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddUpdateSubCategoryComponent);
    dialogRef.componentInstance.headerInfo = 'Add Subcategory';
    dialogRef.componentInstance.processName = CategoryProcessName.Add;
  }

  openDeleteDialog(
    categoryName: string,
     categoryType: CategoryType,
     categoryId: number
   ): void {
     const dialogRef = this.dialog.open(RemoveCategoryComponent);
     dialogRef.componentInstance.categoryName = categoryName;
     dialogRef.componentInstance.categoryType = categoryType;
     dialogRef.componentInstance.categoryId = categoryId;
   }
   
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Category>;
  resetFilter: Category[] = [];

  observer: Observer<Category[]> = {
    next: (subCatData: Category[]) => {
      this.categoryService.SubCategorydataSource.data = this.categoryService.subCategories = subCatData;
      this.categoryService.SubCategorydataSource.sort = this.sort;
      this.categoryService.SubCategorydataSource.paginator = this.paginator;
      this.table.dataSource = this.categoryService.SubCategorydataSource;
      this.resetFilter = subCatData;
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
    },
  };


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'name',
    'parentCategoryName',
    'Visibility',
    'Edit',
    'Delete',
  ];

  constructor(public categoryService: CategoryService,
    private dialog: MatDialog) {
    this.categoryService.SubCategorydataSource = new SubCategoryDataSource();
  }

  ngOnInit(): void {
    this.categoryService.getApprovedCategories(CategoryType.SubCategory).subscribe(this.observer);
    this.renderRows();
  }

  renderRows() {
    this.categoryService.getData().subscribe((data: Category[]) => {
      if (data) {
        if (data[0].type == CategoryType.SubCategory) {
          this.categoryService.SubCategorydataSource.data = data;
          this.table.dataSource = data;
          this.categoryService.SubCategorydataSource.sort = this.sort;
          this.categoryService.SubCategorydataSource.paginator = this.paginator;
        }
      }
    });
  }

  applyFilter(event: any) {
    this.categoryService.SubCategorydataSource.data = this.table.dataSource =
      this.resetFilter;
    this.categoryService.SubCategorydataSource.filter = (
      event.target as HTMLInputElement
    ).value
      .trim()
      .toLowerCase();
    this.categoryService.SubCategorydataSource.connect().subscribe((data) => {
      this.categoryService.SubCategorydataSource.data = data;
      this.table.dataSource = data;
    });
  }
}
