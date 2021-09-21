import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
  providers: [TaskService]
})
export class TaskPageComponent implements OnInit {
  @Input() task: TaskComponent;


  constructor(private taskServ: TaskService) { }

  ngOnInit() {

  }






}
