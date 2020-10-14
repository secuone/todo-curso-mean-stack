import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl = "http://localhost:3004/api/task";
  private listTaskUrl = "http://localhost:3004/api/task/list";
  private taskImageUploadUrl = "http://localhost:3004/api/task/upload";

  constructor(private http: HttpClient) { }

  getTasks(){
    return this.http.get<any>(this.listTaskUrl);
  }

  createImageUpload(task){
    return this.http.post<any>(this.taskImageUploadUrl, task);
  }

  createTask(task){
    return this.http.post<any>(this.taskUrl, task);
  }

  editTask(task){
    return this.http.put<any>(this.taskUrl, task);
  }

  deleteTask(task){
    const _id = task._id; 
    const url = `${this.taskUrl}/${_id}`;
    return this.http.delete<any>(url);
  }
}
