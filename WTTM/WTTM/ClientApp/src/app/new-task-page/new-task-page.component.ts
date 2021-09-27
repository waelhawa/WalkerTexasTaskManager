import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../models/Task';
import { TaskService } from '../services/task.service';
import { DatePipe, formatDate } from '@angular/common';
import { SprintService } from '../services/sprint.service';
import { UsersService } from '../services/users.service';
import { Users } from '../models/Users';
import { Sprints } from '../models/Sprints';


@Component({
  selector: 'app-new-task-page',
  templateUrl: './new-task-page.component.html',
  styleUrls: ['./new-task-page.component.css'],
})
export class NewTaskPageComponent implements OnInit {
  bandit: string = "/assets/images/64 bit bandit.png";
  task: Task = {taskId: 0, sprintId: 0, userId: '', dateCreated: null, shortDesc: 'shorty', fullDesc: 'longy', storyPoint: 10, isCompleted: false, taskStatus: 'new', dateCompleted: null, scoreKeep: 0};
  pipe: DatePipe = new DatePipe('en-US');
  user: Users;
  sprints: Sprints [];

  constructor(private taskServ: TaskService, private sprintServ: SprintService, private userServ: UsersService) { }

  ngOnInit() {
    this.getInfo();
  }

  onSubmit(form: NgForm){
    this.task = form.form.value;
    console.log(this.task);
    this.taskServ.createTask(this.task).subscribe();
  }

  getInfo(){
    this.userServ.getCurrentUser().subscribe(result => {
      this.user = result;
      this.sprintServ.getSprintsByTeamId(result.teamId).subscribe(response => {
        this.sprints = response;
        console.log(response);
      });
    });
  }
}