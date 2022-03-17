import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  isLoading: boolean = false;

  constructor( private form_builder: FormBuilder,
              private request_service: RequestService ) { 

    this.categoryForm = this.form_builder.group({
      name: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  addCategory() {
    this.isLoading = true
    const body: Category = this.categoryForm.value
    this.request_service.addCategory(body).subscribe(
      {
        next: (data) => {
          this.isLoading = false;
          this.categoryForm.reset()
        },
        error: (e) => console.error(e),
        complete: () => alert('Created Successfully!') 
      }
    )
  }

}
