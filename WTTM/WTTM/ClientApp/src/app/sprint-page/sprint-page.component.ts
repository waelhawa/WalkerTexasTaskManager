import { Component, Input, OnInit } from '@angular/core';
import { Sprints } from '../models/Sprints';
import { Task } from '../models/Task';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SprintService } from '../services/sprint.service';

@Component({
  selector: 'app-sprint-page',
  templateUrl: './sprint-page.component.html',
  styleUrls: ['./sprint-page.component.css']
})
export class SprintPageComponent implements OnInit {

  sprint: Sprints;
  tasksInSprint: Task [];
  empty:boolean = false;
  chuckGif: string ="/assets/images/Chuck Gif.gif";
  id: number;


  constructor(private sprintServ:SprintService, private taskServ: TaskService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.getTasksBySprintId(this.id);
  }
  
  getTasksBySprintId(id: number){
    this.taskServ.getTasksBySprintId(id).subscribe(
      result => {
        this.tasksInSprint = result;
        console.log(result);
        this.sprintServ.getSprintsById(id).subscribe(response => {
          this.sprint = response;
          console.log(response);
        });

      }
    )
  }

}
