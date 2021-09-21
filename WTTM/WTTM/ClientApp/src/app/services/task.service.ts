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

  // TaskId: number;
  // SprintId: number;
  // UserId: number;
  // DateCreated: number;
  // DateCompleted: number;
  // ShortDesc: string;
  // FullDesc: string;
  // StoryPoint: number;
  // IsCompleted: boolean;
  // TaskStatus: string;
  
  
  
  
  //Read getTasks
  getTasks()
  {
    return this.http.get<Task[]>(`${this.apiUri}/gettasks`);
  }
  
  gettasksbyid(id:number)
  {
    return this.http.get<Task>(`${this.apiUri}/gettasksbyid/${id}`);
  }

  getUnassignedTasks()
  {

    return this.http.get<Task[]>(`${this.apiUri}/getunassignedtasks`);
  }
  
  //Create createTasks
  createTask(task: Task)
  {
    console.log(task);
    return this.http.post<Task>(`${this.apiUri}/createtask`, {"SprintId": null, "UserId": null, "DateCreated": '', "ShortDesc": task.ShortDesc, "FullDesc": task.FullDesc, "StoryPoint": task.StoryPoint, "IsCompleted": false, "TaskStatus": task.TaskStatus, "DateCompleted": null});
    //return this.http.post<Task>(`${this.apiUri}/createtask`, {"ShortDesc": task.ShortDesc, "FullDesc": task.FullDesc, "StoryPoint": task.StoryPoint, "TaskStatus": task.TaskStatus});
  }

  //Detele deletetask/{id}
  deleteTasks(id:number)
  {
    return this.http.delete(`${this.apiUri}/deletetask/${id}`);
  }

  //Update updatetask/{id}
  upDateTask(id:number, task:Task)
  {
    return this.http.put<Task>(`${this.apiUri}/updatetask/${id}}`, task);
  }

}



