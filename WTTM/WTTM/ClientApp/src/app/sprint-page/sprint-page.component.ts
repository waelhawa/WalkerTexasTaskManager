import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';


@Component({
  selector: 'app-sprint-page',
  templateUrl: './sprint-page.component.html',
  styleUrls: ['./sprint-page.component.css'],
  providers: [TaskService]
})
export class SprintPageComponent implements OnInit {
empty: boolean = false;
chuckGif: string ="/assets/images/Chuck Gif.gif";
allTasks: Task[]=[];

  constructor(private taskServ: TaskService) { }

  ngOnInit(): void {
    this.getTasksBySprintId();

  }

  getTasksBySprintId(){
    this.taskServ.getUnassignedTasksInSprint
  }

}
