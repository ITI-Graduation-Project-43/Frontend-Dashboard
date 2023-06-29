import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { APIService } from '../shared/Services/api.service';
import { Category } from '../Models/category';
import { APIResponseVM } from '../shared/ViewModels/apiresponse-vm';
import { CategoryDataSource } from '../Components/category/category-list/category-datasource';
import { CategoryType } from '../Models/Enums/CategoryType';
import { SubCategoryDataSource } from '../Components/category/sub-category-list/sub-category-datasource';
import { TopicDataSource } from '../Components/category/topic-list/topic-datasource';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  CategorydataSource!: CategoryDataSource;
  SubCategorydataSource!: SubCategoryDataSource;
  TopicdataSource!: TopicDataSource;

  categories:Category[] = [];
  subCategories:Category[] = [];


  private dataSubject = new BehaviorSubject<any>(null);


  setData(data: any) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }
  constructor(private apiService:APIService) { }

  getApprovedCategories(type:CategoryType): Observable<Category[]> {
    return this.apiService
      .getAllItem(`category/type/${CategoryType[type]}?PageNumber=1&PageSize=450`)
      .pipe(map((data: APIResponseVM) => data.items as Category[]));
  }

  AddCategory(category: Category): Observable<Category[]> {
    return this.apiService
      .addItem(`category`, category)
      .pipe(map((data: APIResponseVM) => data.items as Category[]));
  }

  removeCategory(id:number): Observable<APIResponseVM> {
    return this.apiService
      .deleteItem(`category/${id}`);
  }

  updateCategory(id:number, category:Category): Observable<[]> {
    return this.apiService
      .replaceItem(`category`, id, category)
      .pipe(map((data: APIResponseVM) => data.items));
  }
}
