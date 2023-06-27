import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIService } from '../shared/Services/api.service';
import { APIResponseVM } from '../shared/ViewModels/apiresponse-vm';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class CourseService extends APIService {
  private dataSubject = new BehaviorSubject<any>(null);

  setData(data: any) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }
  constructor(http: HttpClient) {
    super(http);
  }
  makeCourseApprove(id: number): Observable<APIResponseVM> {
    const url = `${environment.APIURL}Course/makeCourseApproved/${id}`;
    return this.http
      .put<APIResponseVM>(url, '')
      .pipe(retry(3), catchError(this.handleError));
  }
}
