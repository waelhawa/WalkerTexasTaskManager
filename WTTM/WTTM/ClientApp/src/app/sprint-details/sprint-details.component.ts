import { Component, OnInit } from '@angular/core';
import { Sprints } from '../models/Sprints';
import { Teams } from '../models/Teams';
import { Users } from '../models/Users';
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

  sprintsByTeams: Sprints [] = [];
  team: Teams;
  user: Users;
  sprint: Sprints;
  empty:boolean = true;
  logged: boolean = false;
  chuckGif: string ="/assets/images/Chuck Gif.gif";


  constructor(private userServ: UsersService, private sprintServ: SprintService, private teamServ: TeamsService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  checkSprintForTeam(){
    if (this.sprint == null){
      this.empty = true;
    }
    else {
      this.empty = false;
    }
  }



  getCurrentUser() {
    this.userServ.getCurrentUser().subscribe(result =>
      {
        this.user = result;
        console.log(this.user);
        this.sprintServ.getSprintsByTeamId(this.user.teamId).subscribe(
          result => {
            this.sprintsByTeams = result ;
            console.log(result);
            this.teamServ.getTeamById(this.user.teamId).subscribe(result => {
              this.team = result;
            });
          }
        );
        this.checkSprintForTeam();
      }
    );
  }
}
