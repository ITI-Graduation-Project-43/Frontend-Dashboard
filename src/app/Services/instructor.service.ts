import { Injectable, ViewChild } from '@angular/core';
import { APIService } from '../shared/Services/api.service';
import { APIResponseVM } from '../shared/ViewModels/apiresponse-vm';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { InstructorDataSource } from '../Components/instructor/instructor-list/instructor-datasource';
import { Instructor } from '../Models/instructor';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  dataSource!: InstructorDataSource;
  selectedFile!: File;
  uploadPlaceHolder: string = 'Upload Picture --choose file--';

  private dataSubject = new BehaviorSubject<any>(null);

  setData(data: any) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }

  constructor(private apiService: APIService) {}

  getAllInstructors(): Observable<Instructor[]> {
    return this.apiService
      .getAllItem('Instructor?PageNumber=1&PageSize=200')
      .pipe(map((data: APIResponseVM) => data.items as Instructor[]));
  }

  RemoveInstructor(id: string): Observable<Instructor[]> {
    return this.apiService
      .deleteItem(`Instructor/${id}`)
      .pipe(map((data: APIResponseVM) => data.items as Instructor[]));
  }

  AddInstructor(instructor: Instructor): Observable<Instructor[]> {
    return this.apiService
      .addItem(`User/Register/Instructor`, instructor)
      .pipe(map((data: APIResponseVM) => data.items as Instructor[]));
  }

  UpdateInstructor(instructor: Instructor, id: string): Observable<[]> {
    return this.apiService
      .updateItem(`Instructor/${id}`, instructor)
      .pipe(map((data: APIResponseVM) => data.items));
  }

  uploadImage(id: string) {
    if (this.selectedFile) {
      const formDate = new FormData();
      formDate.append(
        'ProfilePictureFile',
        this.selectedFile,
        this.selectedFile.name
      );

      this.apiService
        .addItem(`Instructor/UploadImage?id=${id}`, formDate)
        .subscribe((data: APIResponseVM) => {
          console.log(data.message);
        });
    }
  }
}
