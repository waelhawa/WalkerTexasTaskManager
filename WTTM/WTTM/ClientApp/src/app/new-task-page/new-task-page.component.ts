import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../models/Task';
import { TaskService } from '../services/task.service';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-new-task-page',
  templateUrl: './new-task-page.component.html',
  styleUrls: ['./new-task-page.component.css'],
  providers: [TaskService]
})
export class NewTaskPageComponent implements OnInit {
  bandit: string = "/assets/images/64 bit bandit.png"
  task: Task = {TaskId: 0, SprintId: 0, UserId: 0, ShortDesc: "", FullDesc: "", StoryPoint: 0, IsCompleted: false, TaskStatus: "new",
  DateCompleted: null, DateCreated: null}
  pipe: DatePipe = new DatePipe('en-US');

  constructor(private taskServ: TaskService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.task = form.form.value;
    this.task.IsCompleted = false;
    this.task.DateCreated = new Date();
    this.task.DateCompleted = new Date();
    this.taskServ.createTask(this.task);
  }


///////TODO add user assignment


}

// TaskId: number;
// SprintId: number;
// UserId: number;
// DateCreated: Date;
// DateCompleted: Date;
// ShortDesc: string;
// FullDesc: string;
// StoryPoint: number;
// IsCompleted: boolean;
// TaskStatus: string;
