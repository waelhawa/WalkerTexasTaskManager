import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task = {TaskId: 0, SprintId: 0, UserId: "", ShortDesc: "", FullDesc: "", StoryPoint: 0, IsCompleted: false, TaskStatus: "new",
  DateCompleted: null, DateCreated: null}
  constructor() { }

  ngOnInit(): void {
      console.log(this.task)
  }

}
