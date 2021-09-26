import { Component, Input, OnInit } from '@angular/core';
import { Sprints } from '../models/Sprints';
import { Task } from '../models/Task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-sprint-page',
  templateUrl: './sprint-page.component.html',
  styleUrls: ['./sprint-page.component.css']
})
export class SprintPageComponent implements OnInit {

  @Input() sprint: Sprints;
  tasksInSprint: Task [];
  empty:boolean = false;
  chuckGif: string ="/assets/images/Chuck Gif.gif";


  constructor(private taskServ: TaskService) { }

  ngOnInit() {
    this.getTasksBySprintId(this.sprint.sprintId);
  }

  getTasksBySprintId(id: number){
    this.taskServ.getTasksBySprintId(id).subscribe(
      result => {
        this.tasksInSprint = result;
      }
    )
  }

}
