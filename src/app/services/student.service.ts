import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Student } from '../Models/student';
import { APIService } from '../shared/Services/api.service';
import { APIResponseVM } from '../shared/ViewModels/apiresponse-vm';

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

  setData(data: any) {
    this.dataChange.next(data);
  }

  getData() {
    return this.dataChange.asObservable();
  }

  constructor(private httpClient: HttpClient, private apiService: APIService) {}

  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */

  getAllStudents(pageNumber: number, pageSize:number): Observable<Student[]> {
    return this.apiService
      .getAllItem(`Student?PageNumber=${pageNumber}&PageSize=${pageSize}`)
      .pipe(
        map((data: APIResponseVM) => data.items as Student[]),
        tap((students: Student[]) => {
          this.data = students;
          this.dataChange.next(students);
        })
      );
  }

  deleteItem(id: string): Observable<APIResponseVM> {
    return this.apiService.deleteItem(`Student/${id}`);
  }

  UpdateStudent(student: Student, id: string): Observable<[]> {
    return this.apiService
      .updateItem(`Student/${id}`, student)
      .pipe(map((data: APIResponseVM) => data.items));
  }

  AddStudent(student: Student): Observable<Student[]> {
    return this.apiService
      .addItem(`User/Register/Student`, student)
      .pipe(map((data: APIResponseVM) => data.items as Student[]));
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
