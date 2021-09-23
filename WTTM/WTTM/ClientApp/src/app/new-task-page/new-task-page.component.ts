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
  task: Task = {taskId: 0, sprintId: 0, userId: '', dateCreated: null, shortDesc: 'shorty', fullDesc: 'longy', storyPoint: 10, isCompleted: false, taskStatus: 'new', dateCompleted: null, scoreKeep: 0}
  pipe: DatePipe = new DatePipe('en-US');

  constructor(private taskServ: TaskService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    //this.task = form.form.value;
    // this.task.FullDesc = form.form.value.FullDesc;
    // this.task.ShortDesc = form.form.value.ShortDesc;
    // this.task.StoryPoint = form.form.value.StoryPoint;
    // this.task.SprintId = 100;
    // this.task.DateCreated = formatDate(this.pipe.transform(Date.now(), 'short'), 'MM/dd/yyyy', 'en-US');
    this.task.dateCreated = new Date();
    this.task.dateCompleted = new Date();
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
