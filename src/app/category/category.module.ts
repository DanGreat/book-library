import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../shared-component/components.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';


const routes: Routes = [
  { path: '', component: CategoryComponent},
  { path: 'add', component:  AddCategoryComponent},
  { path: 'edit/:id', component:  EditCategoryComponent},
]

@NgModule({
  declarations: [ CategoryComponent, AddCategoryComponent, EditCategoryComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
