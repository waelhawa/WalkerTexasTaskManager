import { Component, Input, OnInit } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';
import { ChuckJokeService } from '../services/chuck-joke.service';
import { SigninResponse, User, UserManager } from 'oidc-client';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { ActivatedRoute, Router } from '@angular/router';
import { geteuid } from 'process';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs/operators';
import { identity } from 'rxjs';

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
  userId: any;
  
  constructor(private taskServ: TaskService, private userServ: UsersService, private authorizeService: AuthorizeService)  { }

  ngOnInit(): void {
      //this.userId = this.authorizeService.getUser().pipe(map(u => u && {name: u.name}));


      // this.userId = this.authorizeService.getUser().subscribe(
      //   result => this.userId = result
      // );
      //this.getCurrentUser();

      
      console.log(this.userId)
  }

  getUserTasks(id: string){

    
  }

  getCurrentUser() {
    // this.userServ.getCurrentUser().subscribe(
    //   result => this.userId = result
    //)

    this.userServ.getCurrentUser().subscribe(
      result => {
        this.userId = result;
        // if (this.article.userid == this.userId){
        //   this.isOwner = true;
        // }
        // else {
        //   this.isOwner = false;
        // }
      }
    );
  }

}




