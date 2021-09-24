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
import { Users } from '../models/Users';
import { url } from 'inspector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  chuckGif: string ="/assets/images/Chuck Gif.gif";
  yourTasks: Task[] = [];
  empty: boolean = true;
  joke: string = "";
  allUsers: Users[] = [];
  user: Users;
  // userName: any;
  // isAuthenticated: any = false;
  // something: string = "3475ae69-eede-42b1-841e-53dfe3cac633";
  
  constructor(private taskServ: TaskService, private userServ: UsersService, private authorizeService: AuthorizeService)  { }

  ngOnInit(): void {
    // this.instructions();
    // console.log(this.user);
    // console.log(this.authorizeService.completeSignIn(window.location.href));

    // this.isAuthenticated = this.authorizeService.isAuthenticated();
    // if (this.isAuthenticated){
      
    //   this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
    //   console.log(this.userName);
    // }
  }
  
  // getUserTasks(id: string){
    
    
    // }
  //   instructions = () => {

  //   this.getUsers();
  //   this.user = this.allUsers[0];
  //   console.log(this.user);
  //   this.getCurrentUser();
  //   console.log(this.allUsers);
  //   console.log("all users") ;
    
  // }
  

  async getCurrentUser() {
    this.userServ.getCurrentUser().subscribe(
      result => { 
        console.log(result);
        this.user = result;
        
      }
    );
  }

  getUsers(){
    this.userServ.getUsers().subscribe(
      response => { response.forEach(element => {this.allUsers.push(element)
        
      });;
        console.log(response)},
      error => console.log(error)
    );
  }

}




