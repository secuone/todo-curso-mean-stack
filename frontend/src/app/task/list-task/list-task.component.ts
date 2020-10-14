import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  tasks = [];

  constructor(private taskService: TaskService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.taskService.getTasks()
      .subscribe(
        res => {
          this.tasks = res
        },
        err => {
          console.log(err)
        }
      )
  }

  changeStatus(task, status){
    const temporalStatus = task.status;
    task.status = status;
    this.taskService.editTask(task)
      .subscribe(
        res => {
          task.status = status;
        },
        err => { 
          task.status = temporalStatus;
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this.snackBar.open("Se ha producido un error.", null, {
                duration: 2000
              });
              this.router.navigate(['/login']);
            }
          }
        }
      );
  }

  delete(task){
    this.taskService.deleteTask(task)
      .subscribe(
        res => {
          const index = this.tasks.indexOf(task);

          if(index > -1){
            this.tasks.splice(index,1);
            this.snackBar.open("Tarea borrada.", null, {
              duration: 2000
            })
          }
        },
        err => {
          console.log(err);
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this.snackBar.open("Se ha producido un error.", null, {
                duration: 2000
              });
              this.router.navigate(['/login']);
           }
          }     
        }
      )
  }
}
