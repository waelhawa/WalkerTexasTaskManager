import { Component, Input, OnInit } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';
import { ChuckJokeService } from '../services/chuck-joke.service';
import { SigninResponse, User, UserManager } from 'oidc-client';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  id: string;
  
  constructor(private taskServ: TaskService, private authorizeService: AuthorizeService, private activatedRoute: ActivatedRoute, private router: Router)  { }

  ngOnInit(): void {
    // this.id = this.user.id_token;
    // this.getUserTasks(this.id);
    this.authorizeService.getAccessToken().subscribe(
      result => this.id = result.toString()
    )
    console.log(this.id);
  }

  getUserTasks(id: string){
    this.taskServ.getTasksByUserId(id).subscribe(
      result => this.yourTasks = result
    )
  }

}




