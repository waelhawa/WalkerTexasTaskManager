import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Alert } from 'selenium-webdriver';
import { Teams } from '../models/Teams';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-new-team-page',
  templateUrl: './new-team-page.component.html',
  styleUrls: ['./new-team-page.component.css']
})
export class NewTeamPageComponent implements OnInit {
  team: Teams = {teamId: 0, teamName: "", teamPoints: 0};
  exists: boolean = false;
  message: string = "This team name is not available";

  constructor(private teamsServ: TeamsService) { }

  ngOnInit() {

  }
  
  onSubmit(form: NgForm) {
    this.exists = false;
    this.team.teamName = form.form.value.teamName;
    console.log(this.team);
    this.teamsServ.getTeams().subscribe(result => 
      {
      result.forEach(element => 
        {
        if ((element.teamName.toLowerCase() == this.team.teamName.toLowerCase()) || (this.team.teamName == "") || (this.team.teamName == null))
        {
          this.exists = true;
        }
      });
      if (!this.exists) {
        this.team.teamName = this.team.teamName.substring(0,1).toUpperCase() + this.team.teamName.substring(1, this.team.teamName.length).toLowerCase();
        this.teamsServ.createTeam(this.team).subscribe();
        alert("Team Added successfully")
        window.location.href = '../home';
      }
      else {
        alert(this.message);
      }
    });

  }
}
