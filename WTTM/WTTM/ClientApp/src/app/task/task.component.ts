import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {
  tasks: Observable<Task[]>;
  constructor(private taskServ: TaskService) { }

  ngOnInit(): void {
    this.tasks = this.taskServ.getTasks();
  }

}
