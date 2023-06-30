import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { Message } from 'src/app/Models/Message';
import { APIService } from 'src/app/shared/Services/api.service';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  Messages: Message[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public dataSource!: MatTableDataSource<Message>;
  displayedColumns: string[] = [
    'Name',
    'Email',
    'Message',
    'CreatedAt',
    'isReplyed',
    'Operations',
  ];
  status: string = '';
  constructor(private apiService: APIService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.fetchData();
  }

  //for filtering the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fetchData(pageNumber: number = 1, pageSize: number = 5) {
    const observer = {
      next: (data: any) => {
        this.Messages = data.items;
        this.dataSource = new MatTableDataSource(this.Messages);
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        console.log(error);
      },
    };
    this.apiService
      .getAllItem(`Message?PageNumber=${pageNumber}&PageSize=${pageSize}`)
      .subscribe(observer);
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data: any
  ): void {
    this.dialog.open(ReplyComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        key: data,
      },
    });
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex + 1;
    const endIndex = event.pageSize;
    this.fetchData(startIndex, endIndex);
  }
}
