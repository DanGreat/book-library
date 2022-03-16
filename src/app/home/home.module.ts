import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'add', component:  AddBookComponent},
  { path: 'edit/:id', component:  EditBookComponent},
]

@NgModule({
  declarations: [ HomeComponent, AddBookComponent, EditBookComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
})

export class HomeModule { }
