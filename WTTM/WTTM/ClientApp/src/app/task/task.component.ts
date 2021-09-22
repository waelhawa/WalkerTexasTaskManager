import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/Task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {
  @Input() task: Task; 
  // {
  //   TaskId: 1000, 
  //   SprintId: 1000, 
  //   UserId: 'MainUser', 
  //   DateCreated: new Date(),
  //   ShortDesc: 'Short Description', 
  //   FullDesc: 'Long Description', 
  //   StoryPoint: 1000, 
  //   IsCompleted: false, 
  //   TaskStatus: 'new',
  //   DateCompleted: new Date() 
  // };

  constructor(private taskServ: TaskService) { }
  //Don't want to change too much, looks like 

  ngOnInit(): void {
      console.log(this.task.fullDesc)
  }

  //get a list of unassigned tasks withing the sprint

  //make sure that the user ID is null

}
