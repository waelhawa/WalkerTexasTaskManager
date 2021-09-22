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

  getTasksByUserId(id: string)
  {
    return this.http.get<Task[]>(`${this.apiUri}/gettasksbyuserid/${id}`)
  }

  getUnassignedTasks()
  {

    return this.http.get<Task[]>(`${this.apiUri}/getunassignedtasks`);
  }
  
  //Create createTasks
  createTask(task: Task)
  {
    return this.http.post<Task>(`${this.apiUri}/createtask`, {"dateCreated": new Date(), "shortDesc": task.shortDesc, "fullDesc": task.fullDesc, "storyPoint": task.storyPoint, "isCompleted": false, "taskStatus": task.taskStatus, "dateCompleted": new Date()});
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



