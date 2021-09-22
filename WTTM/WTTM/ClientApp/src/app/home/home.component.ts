import { Component, Input, OnInit } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';
import { ChuckJokeService } from '../services/chuck-joke.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  chuckGif: string ="/assets/images/Chuck Gif.gif";
  yourTasks: Task[] = [];
  empty: boolean = true;
  joke: string = ""
  @Input() id: string;    //send user Id here.
  
  constructor(private taskServ: TaskService) { }

  ngOnInit(): void {
    this.getUserTasks(this.id);
  }

  getUserTasks(id: string){
    this.taskServ.getTasksByUserId(id).subscribe(
      result => this.yourTasks = result
    )
  }

}




