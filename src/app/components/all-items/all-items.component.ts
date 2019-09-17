import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { AuthService } from 'src/app/services/auth.service';

import { TodoService } from './../../services/todo.service';

@Component({
  selector: "app-all-items",
  templateUrl: "./all-items.component.html",
  styleUrls: ["./all-items.component.sass"]
})
export class AllItemsComponent implements OnInit {
  todos: Array<Todo> = [];
  openAddNew: boolean = false;
  content: string = "";
  editContent: string = "";
  @ViewChild("deleteModal", { static: false }) deleteModal;
  @ViewChild("editModal", { static: false }) editModal;

  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllItemsAndSort();
    this.todoService.isListUpdated().subscribe(res => {
      if (res) {
        this.getAllItemsAndSort();
      }
    });
  }

  getAllItemsAndSort() {
    this.todoService.getAll().subscribe(
      res => {
        this.todos = res["todos"].sort((a, b) => {
          return a.done === b.done ? 0 : a.done ? 1 : -1;
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  onAddNew() {
    this.todoService.addNew(this.content).subscribe(
      res => {
        this.todoService.updateList();
        this.content = "";
        this.openAddNew = false;
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
        this.todoService.updateList();
      },
      err => {
        console.log(err);
      }
    );
  }

  onDeleteItem(id: string) {
    let dialogRef = this.dialog.open(this.deleteModal, {
      width: "350px",
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.todoService.deleteItem(id).subscribe(
            res => {
              this.todoService.updateList();
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  logout() {
    this.authService.logoutUser().subscribe(
      res => {
        this.authService.removeToken();
        this.router.navigate(["/login"]);
      },
      err => {
        console.log(err);
      }
    );
  }
}
