import { Component, OnInit } from '@angular/core';
import { Sprints } from '../models/Sprints';
import { Teams } from '../models/Teams';
import { Users } from '../models/Users';
import { SprintComponent } from '../sprint/sprint.component';
import { SprintService } from '../services/sprint.service';
import { TeamsService } from '../services/teams.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css'],
  providers: [SprintService]
})
export class SprintDetailsComponent implements OnInit {

  sprintsByTeams: Sprints[] = [];
  newSprints: Sprints[];
  team: Teams;
  user: Users;
  sprint: Sprints;
  empty: boolean = true;
  logged: boolean = false;
  partOfTeam: boolean = false;
  chuckGif: string = "/assets/images/Chuck Gif.gif";
  newSprint: Sprints = 
  {
    sprintId:0,
    teamId:0,
    dateCreated: new Date(),
    dateCompleted: new Date(),
    isCompleted: false,
    sprintStatus:"",
    totalStoryPoint:0
  };


  constructor(private userServ: UsersService, private sprintServ: SprintService, private teamServ: TeamsService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  checkSprintForTeam() {
    if (this.sprintsByTeams == null) {
      this.empty = true;
    }
    else {
      this.empty = false;
    }
  }

  createSprintButton() {
    this.newSprint.teamId = this.user.teamId;
    this.newSprint.dateCreated = new Date();
    this.newSprint.dateCompleted = new Date();
    this.newSprint.sprintStatus = "New";
    this.sprintServ.createSprint(this.newSprint).subscribe();
    window.location.reload();
  }

  checkTeam() {
    if (this.user.teamId == null || this.user.teamId < 1) {
      this.partOfTeam = false;
    }
    else {
      this.partOfTeam = true;
    }
  }

  checkUser() {
    if (this.user == null) {
      this.logged = false;
    }
    else {
      this.logged = true;
    }
  }

  // descending(){
  //   for (let i = this.sprintsByTeams.length; i = 0; i--){
  //     this.newSprints.push(this.sprintsByTeams[i]);
  //   }
  //   console.log(this.newSprints)
  // }

  getCurrentUser() {
    this.userServ.getCurrentUser().subscribe(result => {
      this.user = result;
      this.checkUser();
      this.checkTeam();
      console.log(this.user);
      if (this.logged) {
        this.sprintServ.getSprintsByTeamId(this.user.teamId).subscribe(response => {
          this.sprintsByTeams = response;
          this.checkSprintForTeam();
          console.log(response);
          if(!this.empty){
            this.teamServ.getTeamById(this.user.teamId).subscribe(result2 => {
              this.team = result2;
            });
          }
        }
        );
        
      }
    }
    );
    // this.descending();
  }
}
