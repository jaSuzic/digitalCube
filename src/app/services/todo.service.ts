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

  addNew(content: string) {
    return this.http.put(BE_API, { content: content });
  }

  markItem(id: string, checked: boolean) {
    return this.http.patch(BE_API + "/" + id, { done: checked });
  }
}
