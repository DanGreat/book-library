import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestService } from '../services/request.service';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading: boolean = false
  books: any
  bookSubscription = new Subscription;

  constructor(private request_service: RequestService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBooks()
  }

  ngAfterViewInit() {
    feather.replace();
  }

  getBooks() {
    this.bookSubscription = this.request_service.getBooks().subscribe(
      {
        next: (data) => console.log('Data: ', data),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      }
    )

  }

  addBook() {
    this.router.navigate(['add'], {relativeTo: this.route})
  }

  editBook(id: number) {
    this.router.navigate([`edit/${id}`], {relativeTo: this.route})
  }

  deleteBook(id: number){
    this.request_service.deleteBook(id).subscribe(
      {
        next: (data) => console.log('Data: ', data),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      }
    );
  }

  ngOnDestroy(){
    this.bookSubscription.unsubscribe()
  }
}
