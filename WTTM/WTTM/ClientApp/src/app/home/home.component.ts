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
import { Teams } from '../models/Teams';
import { TeamsService } from '../services/teams.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  chuckGif: string = "/assets/images/Chuck Gif.gif";
  yourTasks: Task[] = [];
  empty: boolean = true;
  joke: string = "";
  allUsers: Users[] = [];
  user: Users;
  loggedIn: boolean = false;
  teams: Teams [];
  // something: string = "3475ae69-eede-42b1-841e-53dfe3cac633";

  constructor(private taskServ: TaskService, private userServ: UsersService, private teamsServ: TeamsService, private authorizeService: AuthorizeService) { }

  ngOnInit(): void {
    this.getCurrentUser();

  }


  getCurrentUser() {
    this.userServ.getCurrentUser().subscribe(
      result => {
        this.user = result;

      }
    );
  }

  getUsers() {
    this.userServ.getUsers().subscribe(
      response => {
        response.forEach(element => {
          this.allUsers.push(element)

        });;
        console.log(response)
      },
      error => console.log(error)
    );
  }

  getTeams() {
    this.teamsServ.getTeams().subscribe(
      response => {
        this.teams = response;
      }
    )
  }

  changeTeam(form: NgForm){
    this.user.teamId = form.form.value.teamId;
    this.userServ.updateUser(this.user.id, this.user).subscribe();
  }

}




