import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Book } from '../model/book';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseURL = environment.baseUrl
  
  constructor(private http: HttpClient) { }

  // Books Request

  getBook(id: number) {
    return this.http.get(`${this.baseURL}/books/${id}`);
  }

  getBooks() {
    return this.http.get(`${this.baseURL}/books`);
  }

  addBook(body: Book) {
    return this.http.post(`${this.baseURL}/books`, body);
  }

  updateBook(id: number, parameters: Book) {
    return this.http.put(`${this.baseURL}/books/${id}/`, parameters);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.baseURL}/books/${id}/`);
  }

  // Category Request

  getCategory(id: number) {
    return this.http.get(`${this.baseURL}/categories/${id}`);
  }

  getCategories() {
    return this.http.get(`${this.baseURL}/categories`);
  }

  addCategory(body: Category) {
    return this.http.post(`${this.baseURL}/categories`, body);
  }

  updateCategory(id: number, parameters: Category) {
    return this.http.put(`${this.baseURL}/categories/${id}/`, parameters);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseURL}/categories/${id}/`);
  }
}
