import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/Task';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService],
  
})
export class TaskComponent implements OnInit {

  allUATasksInSprint: Task[] = [];
  allTasksInSprint: Task[] = [];

  taskId: number;
  sprintId: number;
  userId: string;
  dateCreated: Date;
  shortDesc: string;
  fullDesc: string;
  storyPoint: number;
  isCompleted: boolean;
  taskStatus: string;
  dateCompleted: Date;



  constructor(private taskServ: TaskService) { }
  

  ngOnInit(): void {
    this.getUassignedTasksInSprint();
        
    }

  getUassignedTasksInSprint(){
    this.taskServ.getUnassignedTasksInSprint(this.sprintId).subscribe(result => this.allUATasksInSprint = result)
  }

  //get a list of unassigned tasks withing the sprint

  //make sure that the user ID is null
  //if userId == false, 

}
