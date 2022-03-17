import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/model/book';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  bookForm: FormGroup;
  isLoading: boolean = false;

  constructor( private form_builder: FormBuilder,
              private request_service: RequestService ) { 
    this.bookForm = this.form_builder.group({
      name: ['', Validators.required],
      isFavorite: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  addBook() {
    this.isLoading = true
    const body: Book = this.bookForm.value
    this.request_service.addBook(body).subscribe(
      {
        next: (data) => {
          console.log('Data: ', data)
          this.isLoading = false
          this.bookForm.reset()
        },
        error: (e) => console.error(e),
        complete: () => alert('Created Successfully!') 
      }
    )

  }

  

}
