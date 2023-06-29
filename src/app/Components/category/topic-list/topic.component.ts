import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TopicDataSource } from './topic-datasource';
import { Category } from 'src/app/Models/category';
import { Observer } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryType } from 'src/app/Models/Enums/CategoryType';
import { AddUpdateTopicComponent } from '../add-update-topic/add-update-topic.component';
import { RemoveCategoryComponent } from '../remove-category/remove-category.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { CategoryProcessName } from 'src/app/Models/Enums/CategoryProcess';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  openDetailsDialog(category: Category) {
    const dialogRef = this.dialog.open(CategoryDetailsComponent);
    category.type = CategoryType[category.type]
    dialogRef.componentInstance.category = category;
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddUpdateTopicComponent);
    dialogRef.componentInstance.processName = CategoryProcessName.Add;
    dialogRef.componentInstance.headerInfo = 'Add Topic';
  }
  openUpdateDialog(name:string, id:number, subCatId:number) {
    const dialogRef = this.dialog.open(AddUpdateTopicComponent);
    dialogRef.componentInstance.name = name;
    dialogRef.componentInstance.headerInfo = 'Update Topic';
    dialogRef.componentInstance.processName = CategoryProcessName.Update;
    dialogRef.componentInstance.parentSubCategoryId = subCatId;
    dialogRef.componentInstance.id = id;
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
    next: (topics: Category[]) => {
      this.categoryService.TopicdataSource.data = topics;
      this.categoryService.TopicdataSource.sort = this.sort;
      this.categoryService.TopicdataSource.paginator = this.paginator;
      this.table.dataSource = this.categoryService.TopicdataSource;
      this.resetFilter = topics;
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
    'parentSubCategoryName',
    'Visibility',
    'Edit',
    'Delete',
  ];

  constructor(public categoryService: CategoryService,
    private dialog: MatDialog) {
    this.categoryService.TopicdataSource = new TopicDataSource();
  }

  ngOnInit(): void {
    this.categoryService.getApprovedCategories(CategoryType.Topic).subscribe(this.observer);
    this.renderRows();
  }

  renderRows() {
    this.categoryService.getData().subscribe((data: Category[]) => {
      if (data) {
        if (data[0].type == CategoryType.Topic) {
          this.categoryService.TopicdataSource.data = data;
          this.table.dataSource = data;
        }
      }
    });
  }

  applyFilter(event: any) {
    this.categoryService.TopicdataSource.data = this.table.dataSource =
      this.resetFilter;
    this.categoryService.TopicdataSource.filter = (
      event.target as HTMLInputElement
    ).value
      .trim()
      .toLowerCase();
        this.categoryService.TopicdataSource.connect().subscribe((data) => {
          this.categoryService.TopicdataSource.data = data;
          this.table.dataSource = data;
        });
  }
}
