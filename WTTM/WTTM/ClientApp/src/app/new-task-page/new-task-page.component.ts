import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../models/Task';
import { TaskService } from '../services/task.service';
import { DatePipe, formatDate } from '@angular/common';


@Component({
  selector: 'app-new-task-page',
  templateUrl: './new-task-page.component.html',
  styleUrls: ['./new-task-page.component.css'],
})
export class NewTaskPageComponent implements OnInit {
  bandit: string = "/assets/images/64 bit bandit.png"
  task: Task = {TaskId: 0, SprintId: 0, UserId: '', DateCreated: null, ShortDesc: '', FullDesc: '', StoryPoint: 0, IsCompleted: false, TaskStatus: '', DateCompleted: null}
  pipe: DatePipe = new DatePipe('en-US');

  constructor(private taskServ: TaskService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    //this.task = form.form.value;
    this.task.FullDesc = form.form.value.FullDesc;
    this.task.ShortDesc = form.form.value.ShortDesc;
    this.task.StoryPoint = form.form.value.StoryPoint;
    // this.task.DateCreated = formatDate(this.pipe.transform(Date.now(), 'short'), 'MM/dd/yyyy', 'en-US');
    this.addTask(this.task);
  }

  addTask(task: Task): void{
    this.taskServ.createTask(task).subscribe();
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
