import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category-list/category.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubCategoryComponent } from './sub-category-list/sub-category.component';
import { TopicComponent } from './topic-list/topic.component';
import { CategoriesContainerComponent } from './categories-container.component';
import { AddUpdateCategoryComponent } from './add-update-category/add-update-update-category.component';
import { RemoveCategoryComponent } from './remove-category/remove-category.component';
import { AddUpdateTopicComponent } from './add-update-topic/add-update-topic.component';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { AddUpdateSubCategoryComponent } from './add-update-sub-category/add-update-sub-category.component';


@NgModule({
  declarations: [
    CategoryComponent,
    SubCategoryComponent,
    TopicComponent,
    CategoriesContainerComponent,
    AddUpdateCategoryComponent,
    RemoveCategoryComponent,
    AddUpdateTopicComponent,
    AddUpdateSubCategoryComponent,
    CategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    SharedModule
  ]
})
export class CategoryModule { }
