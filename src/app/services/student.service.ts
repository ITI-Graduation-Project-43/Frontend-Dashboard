import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly API_URL = 'https://localhost:7129/api/Student';

  dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  data: Student[] = [];
  selectedFile!: File;
  uploadPlaceHolder: string = 'Upload Picture --choose file--';

  constructor(private httpClient: HttpClient) {}

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllStudents(): void {
    this.httpClient.get<any>(this.API_URL).subscribe(
      (res) => {
        this.data = res.items;
        this.dataChange.next(res.items);
        console.log(res);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  deleteItem(id: string): void {
    this.httpClient.delete(this.API_URL + '/' + id).subscribe(
      (data) => {
        alert('successfully deleted');
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }

  UpdateStudent(student: Student, id: string): void {
    this.httpClient.patch<any>(this.API_URL + '/' + id, student).subscribe(
      (data: any) => {
        console.log(data.message);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  AddStudent(student: Student): void {
    this.httpClient.post<any>(this.API_URL, student).subscribe(
      (data: any) => {
        console.log(data.message);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  uploadImage(id: string) {
    if (this.selectedFile) {
      const formDate = new FormData();
      formDate.append(
        'ProfilePictureFile',
        this.selectedFile,
        this.selectedFile.name
      );
      console.log(formDate);

      this.httpClient
        .post<any>(this.API_URL + `/UploadImage?id=${id}`, formDate)
        .subscribe(
          (data: any) => {
            console.log(data.message);
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
          }
        );
    }
  }
}

/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: string): void {
    this.httpClient.delete(this.API_URL + id).subscribe(
      (data) => {
        this.toasterService.open('Successfully deleted', 'Close', {
          duration: 2000,
          panelClass: 'success-snackbar', // Optional: Apply custom CSS class for styling
        });
      },
      (err: HttpErrorResponse) => {
        this.toasterService.open(
          'Error occurred. Details: ' + err.name + ' ' + err.message,
          'Close',
          {
            duration: 8000,
            panelClass: 'success-snackbar', // Optional: Apply custom CSS class for styling
          }
        );
      }
    );
  }
*/
