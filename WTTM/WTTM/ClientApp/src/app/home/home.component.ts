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
  providers:[UsersService]
})
export class HomeComponent implements OnInit {
  chuckGif: string = "/assets/images/Chuck Gif.gif";
  yourTasks: Task[] = [];
  completedTasks: Task [] = [];
  unCompletedTasks: Task [] = [];
  empty: boolean = true;
  joke: string = "";
  allUsers: Users[] = [];
  user: Users;
  logged: boolean = false;
  partOfTeam: boolean = false;
  teams: Teams [];
  uTeamName: string;
  // something: string = "3475ae69-eede-42b1-841e-53dfe3cac633";

  constructor(private taskServ: TaskService, private userServ: UsersService, private teamsServ: TeamsService, private authorizeService: AuthorizeService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }


  getCurrentUser() {
    this.userServ.getCurrentUser().subscribe(result => 
      {
        this.user = result;
        console.log(result);
        this.teamsServ.getTeams().subscribe(result2 => 
          {
            this.teams = result2;
            this.taskServ.getTasksByUserId(result.id).subscribe(result3 => 
              {
                this.yourTasks = result3;
                if (result3 != null){
                  this.empty = false;
                }
                this.checkUser(result);
                this.checkTeam(result);
                this.sifter(result3);
              });
            });
          });
          
  }

  sifter(tasks: Task[]){
    if(tasks != null)
    {
      tasks.forEach(element => {
        if (element.isCompleted){
          this.completedTasks.push(element);
        }
        else {
          this.unCompletedTasks.push(element);
        }
      });
    }
  }

  // displayTeamName(user: Users, teams: Teams[]){
  //   console.log(user.teamId)
  //   if (user.teamId != null){
  //     teams.forEach(element => {
  //       if(user.teamId == element.teamId){
  //         this.uTeamName = element.teamName;
  //         console.log(element.teamName);
  //         console.log(this.uTeamName);
  //       }

  //     });
  //   }
  //   else {
  //     alert("error")
  //   }
  // }

  checkTeam(result: Users){
    if (result.teamId == null){
      this.partOfTeam = false;
      this.uTeamName = "Not part of team yet!";
    }
    else {
      this.partOfTeam = true;
      this.teamsServ.getTeamById(result.teamId).subscribe(response => {
        this.uTeamName = response.teamName.toString();
      });
    }
  }

  checkUser(result: Users){
    if (result == null)
    {
      this.logged = false;
    }
    else
    {
      this.logged = true;
    }
  }



  changeTeam(form: NgForm){
    this.user.teamId = form.form.value.teamId;
    this.userServ.updateUser(this.user.id, this.user).subscribe();
    this.teamsServ.getTeamById(this.user.teamId).subscribe(result => {
      this.uTeamName = result.teamName;
    });
    window.location.reload();
  }

}




