import { Injectable, Inject } from '@angular/core';
import { Task } from '../models/Task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUri: string = "";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUri: string) {
    this.apiUri = `${baseUri}api/tasks`
  }
  /////figure this whole thing out, "BASE_URL", "baseUri", "apiUri"


  addTask(task: Task){
    return this.http.post<Task>(`${this.apiUri}`, {"DateCreated": task.DateCreated, "DateCompleted": task.DateCompleted,
    "ShortDesc": task.ShortDesc, "FullDesc": task.FullDesc, "StoryPoint": task.StoryPoint, "IsCompleted": task.IsCompleted,
    "TaskStatus": task.TaskStatus})
  }
}

// TaskId: number;
// SprintId: number;
// UserId: number;
// DateCreated: date;
// DateCompleted: date;
// ShortDesc: string;
// FullDesc: string;
// StoryPoint: number;
// IsCompleted: boolean;
// TaskStatus: string;


