import { Component, OnInit } from '@angular/core';
import { Sprints } from '../models/Sprints';
import { Users } from '../models/Users';
import { SprintService } from '../services/sprint.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css'],
})
export class SprintDetailsComponent implements OnInit {

  sprintsByTeams: Sprints [] = [];
  teamId: number;
  user: Users;
  empty:boolean = false;
  chuckGif: string ="/assets/images/Chuck Gif.gif";


  constructor(private userServ: UsersService, private sprintServ: SprintService ) { }

  ngOnInit(): void {
    this.getSprintsByTeamId(this.user.teamId);

  }

  getSprintsByTeamId(id: number){
      this.sprintServ.getSprintsByTeamId(id).subscribe(
        result => {
          this.sprintsByTeams = result ;
          console.log(result);
        }
      );
  }

  getCurrentUser() {
    this.userServ.getCurrentUser().subscribe(
      result => {
        this.user = result;

      }
    );
  }
}
