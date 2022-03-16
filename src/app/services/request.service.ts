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
  private token: string
  
  constructor(private http: HttpClient) { 
    this.token = '123'
  }

  getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  // Books Request

  getBook(id: number) {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseURL}/book/${id}`, { headers });
  }

  getBooks() {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseURL}/book`, { headers });
  }

  addBook(body: Book) {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseURL}/book`, body, {
      headers,
    });
  }

  updateBook(id: number, parameters: Book) {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseURL}/book/${id}/`, parameters, {
      headers,
    });
  }

  deleteBook(id: number) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseURL}/book/${id}/`, {
      headers,
    });
  }

  // Category Request

  getCategory(id: number) {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseURL}/category/${id}`, { headers });
  }

  getCategories() {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseURL}/category`, { headers });
  }

  addCategory(body: Category) {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseURL}/category`, body, {
      headers,
    });
  }

  updateCategory(id: number, parameters: Category) {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseURL}/category/${id}/`, parameters, {
      headers,
    });
  }

  deleteCategory(id: number) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseURL}/category/${id}/`, {
      headers,
    });
  }
}
