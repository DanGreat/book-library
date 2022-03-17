import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  categoryForm: FormGroup
  isLoading: boolean = false

  constructor(private form_builder: FormBuilder, 
              private route: ActivatedRoute,
              private router: Router,
              private requestService: RequestService) { 
                this.categoryForm = this.form_builder.group({
                  id: [''],
                  name: ['', Validators.required],
                })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.getCategoryToUpdate(params.id)
    })
  }

  getCategoryToUpdate(id: number) {
    this.requestService.getCategory(id).subscribe(
      {
        next: (data: any) => {
          console.log('To pathch: ', data)
          this.categoryForm.patchValue({
            id: data.id,
            name: data.name,
          })
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      }
    )
  }

  updateCategory() {
    this.isLoading = true
    const id = this.categoryForm.controls['id'].value
    this.requestService.updateCategory(id, this.categoryForm.value).subscribe(
      {
        next: (data: any) => {
          console.log('Mess: ', data)
          this.router.navigate(['category'])
          this.isLoading = false
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      }
    )
  }

}
