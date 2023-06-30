import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories-container',
  templateUrl: './categories-container.component.html',
  styleUrls: ['./categories-container.component.scss'],
})
export class CategoriesContainerComponent {
  constructor(public categoryService: CategoryService) {}
  
}
