import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as feather from 'feather-icons';
import { Subscription } from 'rxjs';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  isLoading: boolean = false
  books: any
  categoriesSubscription = new Subscription;

  constructor(private request_service: RequestService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories()
  }

  ngAfterViewInit() {
    feather.replace();
  }

  getCategories() {
    this.categoriesSubscription = this.request_service.getCategories().subscribe(
      {
        next: (data) => console.log('Data: ', data),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      }
    )

  }

  addCategory() {
    this.router.navigate(['add'], {relativeTo: this.route})
  }

  editCategory(id: number) {
    this.router.navigate([`edit/${id}`], {relativeTo: this.route})
  }

  deleteCategory(id: number){
    this.request_service.deleteCategory(id).subscribe(
      {
        next: (data) => console.log('Data: ', data),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      }
    );
  }

  ngOnDestroy(){
    this.categoriesSubscription.unsubscribe()
  }

}
