import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CategoryDataSource } from './category-datasource';
import { Category } from 'src/app/Models/category';
import { Observer } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryType } from 'src/app/Models/Enums/CategoryType';
import { AddUpdateCategoryComponent } from '../add-update-category/add-update-update-category.component';
import { RemoveCategoryComponent } from '../remove-category/remove-category.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { CategoryProcessName } from 'src/app/Models/Enums/CategoryProcess';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {



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




  openUpdateDialog(name: string, id:number) {
    const dialogRef = this.dialog.open(AddUpdateCategoryComponent);
    dialogRef.componentInstance.name = name;
    dialogRef.componentInstance.headerInfo = "Update Category";
    dialogRef.componentInstance.processName = CategoryProcessName.Update;
    dialogRef.componentInstance.id = id;
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddUpdateCategoryComponent);
    dialogRef.componentInstance.headerInfo = 'Add Category';
    dialogRef.componentInstance.processName = CategoryProcessName.Add;
  }
  openDetailsDialog(category: Category) {
    const dialogRef = this.dialog.open(CategoryDetailsComponent);
    category.type = CategoryType[category.type];
    category.parentCategoryName = "-";
    category.parentSubCategoryName = "-";
    dialogRef.componentInstance.category = category;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Category>;
  resetFilter: Category[] = [];

  observer: Observer<Category[]> = {
    next: (catData: Category[]) => {
      this.categoryService.CategorydataSource.data = this.categoryService.categories = catData;
      this.categoryService.CategorydataSource.sort = this.sort;
      this.categoryService.CategorydataSource.paginator = this.paginator;
      this.table.dataSource = this.categoryService.CategorydataSource;
      this.resetFilter = catData;
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
    'Visibility',
    'Edit',
    'Delete',
  ];

  constructor(public categoryService: CategoryService,
    private dialog: MatDialog) {
    this.categoryService.CategorydataSource = new CategoryDataSource();
  }

  ngOnInit(): void {
    this.categoryService.getApprovedCategories(CategoryType.Category).subscribe(this.observer);
    this.renderRows();
  }

  renderRows() {
    this.categoryService.getData().subscribe((data: Category[]) => {
      if (data) {
        if (data[0].type == CategoryType.Category) {
          this.categoryService.CategorydataSource.data = data;
          this.table.dataSource = data;
          this.categoryService.CategorydataSource.sort = this.sort;
          this.categoryService.CategorydataSource.paginator = this.paginator;
        }
      }
    });
  }

  applyFilter(event: any) {
    this.categoryService.CategorydataSource.data = this.table.dataSource =
      this.resetFilter;
    this.categoryService.CategorydataSource.filter = (
      event.target as HTMLInputElement
    ).value
      .trim()
      .toLowerCase();
    this.categoryService.CategorydataSource.connect().subscribe((data) => {
      this.categoryService.CategorydataSource.data = data;
      this.table.dataSource = data;
    });
  }
}
