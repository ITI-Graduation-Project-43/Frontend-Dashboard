import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessageListComponent } from './message-list/message-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ReplyComponent } from './reply/reply.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import {  ReactiveFormsModule } from '@angular/forms';
import {  MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [MessageListComponent, ReplyComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    SharedModule,
    ReactiveFormsModule,
    MatSortModule,
   
  ],
})
export class MessagesModule {}
