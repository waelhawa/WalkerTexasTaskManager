import { Component, OnInit } from '@angular/core';
import { Task } from '../models/Task';
import { TaskService } from '../services/task.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
  providers: [TaskService]
})
export class BacklogComponent implements OnInit {
  messageNone: string = "Mighty fine work partner! You don't have any tasks in your backlog.";
  empty: boolean = true;
  chuckGif: string ="/assets/images/Chuck Gif.gif"
  allUATasks: Task[] = [];
  allTasks: Task[]=[];




  constructor(private taskServ: TaskService) { }

  ngOnInit(): void {
    this.getAllUnassignedTasks();
  }

  getAllUnassignedTasks(){
    this.taskServ.getUnassignedTasks().subscribe(
      result => this.allUATasks = result
    )
  }

}
