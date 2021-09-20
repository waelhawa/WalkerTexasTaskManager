import { Component } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  chuckGif: string ="/assets/images/Chuck Gif.gif";
  yourTasks: Task[] = [];
  empty: boolean = true;

}



