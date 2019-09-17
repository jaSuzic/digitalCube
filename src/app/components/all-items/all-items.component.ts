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

  /* 
  
  votes.sort(function (vote1, vote2) {

    // Sort by votes
    // If the first item has a higher number, move it down
    // If the first item has a lower number, move it up
    if (vote1.votes > vote2.votes) return 1;
    if (vote1.votes < vote2.votes) return -1;

    // If the votes number is the same between both items, sort alphabetically
    // If the first item comes first in the alphabet, move it up
    // Otherwise move it down
    if (vote1.title > vote2.title) return 1;
    if (vote1.title < vote2.title) return -1;

  });
  
  .sort((a, b) => {
            a = new Date(a.created);
            b = new Date(b.created);
            return a > b ? -1 : a < b ? 1 : 0;
          });

    https://gomakethings.com/sorting-an-array-by-multiple-criteria-with-vanilla-javascript/
  
  */
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
