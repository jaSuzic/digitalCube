import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

import { TodoService } from './../../services/todo.service';

@Component({
  selector: "app-all-items",
  templateUrl: "./all-items.component.html",
  styleUrls: ["./all-items.component.sass"]
})
export class AllItemsComponent implements OnInit {
  todos: Array<Todo> = [];
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getAll().subscribe(
      res => {
        this.todos = res["todos"];
        console.log("TCL: AllItemsComponent -> ngOnInit -> this.todos", res);
      },
      err => {
        console.log(err);
      }
    );
  }

  addNew(content) {
    this.todoService.addNew(content).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  onItemChecked(id: string, checked) {
    this.todoService.markItem(id, checked).subscribe(
      res => {
        let index = this.todos.findIndex(item => item.id === +id);
        this.todos[index].done = checked;
      },
      err => {
        console.log(err);
      }
    );
  }
}
