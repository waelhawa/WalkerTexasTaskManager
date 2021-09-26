import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Sprints } from '../models/Sprints';
import { Users } from '../models/Users';
import { SprintService } from '../services/sprint.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-new-sprint',
  templateUrl: './new-sprint.component.html',
  styleUrls: ['./new-sprint.component.css']
})
export class NewSprintComponent implements OnInit {

  newSprint: Sprints;
  user: Users;
  notLogged: boolean;

  constructor(private userServ: UsersService, private sprintServ: SprintService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  checkUser(){
    if (this.user == null || this.user.teamId == null || this.user.teamId < 1){
      alert("Not Showing");
    }
    else {
      alert("Showing");
    }
  }

  onSubmit(form: NgForm){
    this.newSprint = form.form.value;
    this.newSprint.teamId = this.user.teamId;
    this.newSprint.dateCreated = new Date();
    this.newSprint.dateCompleted = new Date();
    this.sprintServ.createSprint(this.newSprint).subscribe();
  }

  getCurrentUser(){
    this.userServ.getCurrentUser().subscribe(result => {
      this.user = result;
      this.checkUser();
    });
  }

}
