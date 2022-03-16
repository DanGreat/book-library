import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  bookForm: FormGroup
  isLoading: boolean = false

  constructor(private form_builder: FormBuilder, 
              private route: ActivatedRoute,
              private router: Router,
              private requestService: RequestService) { 
                this.bookForm = this.form_builder.group({
                  id: [''],
                  title: ['', Validators.required],
                  author: ['', Validators.required],
                  year: ['', Validators.required],
                  category: ['', Validators.required]
                })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.getBookToUpdate(params.id)
    })
  }

  getBookToUpdate(id: number) {
    this.requestService.getBook(id).subscribe(
      {
        next: (data: any) => {
          console.log('To pathch: ', data)
          this.bookForm.patchValue({
            id: data.id,
            title: data.first_name,
            author: data.last_name,
            year: data.email,
            category: data.phone_number,
          })
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      }
    )
  }

  updateBook() {
    this.isLoading = true
    const id = this.bookForm.controls['id'].value
    this.requestService.updateBook(id, this.bookForm.value).subscribe(
      {
        next: (data: any) => {
          console.log('Mess: ', data)
          this.router.navigate(['home'])
          this.isLoading = false
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      }
    )
  }

  

}
