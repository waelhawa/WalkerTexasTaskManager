import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Teams } from '../models/Teams';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-new-team-page',
  templateUrl: './new-team-page.component.html',
  styleUrls: ['./new-team-page.component.css']
})
export class NewTeamPageComponent implements OnInit {
  team: Teams;
  exists: boolean = false;
  message: string = "This team name is not available";

  constructor(private teamsServ: TeamsService) { }

  ngOnInit() {
  }

  createTeam() {
    if (!this.exists) {
      this.teamsServ.createNewTeam(this.team).subscribe();
    }
    else {
      //team name exists
    }
  }

  onSubmit(form: NgForm) {
    this.team = form.form.value;
    this.checkName();
    this.createTeam();
  }

  checkName() {
    this.exists = false;
    this.teamsServ.getTeams().subscribe(result => {
      result.forEach(element => {
        if (element.teamName == this.team.teamName) {
          this.exists = true;
        }

      });
    });
  }
}
