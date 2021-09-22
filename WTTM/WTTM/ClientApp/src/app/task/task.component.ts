import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
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

  constructor() { }

  ngOnInit(): void {
      console.log(this.task.fullDesc)
  }

}
