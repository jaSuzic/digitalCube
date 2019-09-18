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
  isLoading: boolean = false;

  //I didn't want to make new comp just for this, so I used ng-template for displaying confirmation dialog.
  @ViewChild("deleteModal", { static: false }) deleteModal;

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

  // Idea is to do double sort, firstly to show item that are unfinished and then to sort then from newest to oldest.
  getAllItemsAndSort() {
    this.isLoading = true;
    this.todoService.getAll().subscribe(
      res => {
        this.isLoading = false;
        this.todos = res["todos"].sort((a, b) => {
          if (a.done === b.done) {
            a = new Date(a.created);
            b = new Date(b.created);
            return a > b ? -1 : a < b ? 1 : 0;
          } else if (a.done) return 1;
          else return -1;
        });
      },
      err => {
        this.isLoading = false;
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

  //Logout will simply send req to BE, then remove token from local storage and redirect user to login page.
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
