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
  completedTasks: Task [] = [];
  unCompletedTasks: Task [] = [];
  empty: boolean = true;
  joke: string = "";
  allUsers: Users[] = [];
  user: Users;
  logged: boolean = false;
  partOfTeam: boolean = false;
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
        this.checkUser(result);
        this.checkTeam(result);
        this.teamsServ.getTeams().subscribe(result2 => {
          this.teams = result2;
          this.taskServ.getTasksByUserId(this.user.id).subscribe(result3 => {
            this.yourTasks = result3;
            if (result3 != null){
              this.empty = false;
            }
            this.sifter(result3);
          });
        });
      }
      );

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
      console.log(this.completedTasks);
      console.log(this.unCompletedTasks);
    }
  }

  displayTeamName(){
    if (this.partOfTeam){
      
    }
  }

  checkTeam(result: Users){
    if (this.user.teamId = null){
      this.partOfTeam = false;
    }
    else {
      this.partOfTeam = true;
    }
  }

  checkUser(result: Users){
    if (result.teamId == null || result.teamId < 1)
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
    console.log(form.form.value);
    console.log(form.form.value.teamId);
    console.log(this.user);
    this.userServ.updateUser(this.user.id, this.user).subscribe();
  }

}




