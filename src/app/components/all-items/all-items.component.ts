import { Component, OnInit } from '@angular/core';

import { TodoService } from './../../services/todo.service';

@Component({
  selector: "app-all-items",
  templateUrl: "./all-items.component.html",
  styleUrls: ["./all-items.component.sass"]
})
export class AllItemsComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getAll().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
