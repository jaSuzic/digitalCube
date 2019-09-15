import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Todo } from '../models/todo.model';

const BE_API = environment.apiUrl;

@Injectable({
  providedIn: "root"
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<[Todo]>(BE_API);
  }
}
