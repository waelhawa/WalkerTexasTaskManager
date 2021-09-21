import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  constructor() { }

  ngOnInit(): void {

  }

}
