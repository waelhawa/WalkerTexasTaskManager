import { Component, OnInit } from '@angular/core';
import { Sprints } from '../models/Sprints';
import { Task } from '../models/Task';
import { Teams } from '../models/Teams';
import { Users } from '../models/Users';
import { SprintService } from '../services/sprint.service';
import { TaskService } from '../services/task.service';
import { TeamsService } from '../services/teams.service';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
  providers: [SprintService]
  
})
export class SprintComponent implements OnInit {

  tasksNotAssigned: Task[] = [];
  allSprints: Sprints[] = [];
  currentSprint: Sprints;
  currentTeam: Teams;
  currentUser: Users;

  constructor( private sprintServe: SprintService, private taskserv: TaskService, private teamServ:TeamsService, private userServ: UsersService) { }

  ngOnInit(): void {
    
   this.getSprints();
   
  }

  getSprints(){
    this.sprintServe.getSprints().subscribe(
      result => this.allSprints = result
    )
  }

  // getUnassignedTasksInSprint(){
  //   this.taskserv.getUnassignedTasksInSprint(this.currentSprint.sprintId).subscribe(
  //     result => this.tasksNotAssigned = result
  //   )
  // }

  // getSprintByTeamId(){
  //   this.sprintServe.getSprintsByTeamId(this.currentTeam.teamId).subscribe(
  //     result => this.currentSprint = result
  //   )
  // }

  // getTeamByUserId(){

  // }

}
