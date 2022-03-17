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

  isLoading: boolean = true
  books: any
  allBooks: any;
  filteredBooks: any;
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
    this.isLoading = true;
    this.bookSubscription = this.request_service.getBooks().subscribe(
      {
        next: (data) => {
          console.log('Books: ', data)
          this.books = data
          this.allBooks = this.books
        },
        error: (e) => console.error(e),
        complete: () => {
          this.isLoading = false;
        } 
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
        next: (data) => {
          alert('Deleted Successfully!')
        },
        error: (e) => console.error(e),
        complete: () => {
          this.getBooks();
        }
      }
    );
  }

  filterBooks(ev: any) {
    const value = ev.target.value;
    if(value == 'true'){
      this.books = this.allBooks.filter((book: any) => book?.isFavorite );
    } else if(value == 'false') {
      this.books = this.allBooks.filter((book: any) => !book?.isFavorite );
    } else {
      this.books = this.allBooks
    }
    
    
  }

  ngOnDestroy(){
    this.bookSubscription.unsubscribe()
  }
}
