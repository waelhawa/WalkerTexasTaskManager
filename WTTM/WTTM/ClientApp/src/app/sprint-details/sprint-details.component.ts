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
  empty:boolean = false;
  chuckGif: string ="/assets/images/Chuck Gif.gif";


  constructor(private userServ: UsersService, private sprintServ: SprintService, private teamServ: TeamsService) { }

  ngOnInit(): void {
<<<<<<< HEAD
    this.getSprintsByTeamId(this.user.teamId);
    alert
  }

  getSprintsByTeamId(id: number){
      this.sprintServ.getSprintsByTeamId(id).subscribe(
        result => {
          this.sprintsByTeams = result ;
          console.log(result);
        }
      );
=======
    this.getCurrentUser();
>>>>>>> bae0772949a47e985aa0ead9410445105d8af3bf
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

      }
    );
  }
}
