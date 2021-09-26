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
  logged: boolean = false;

  constructor(private userServ: UsersService, private sprintServ: SprintService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  checkUser(){
    if (this.user.teamId == null || this.user.teamId < 1)
    {
      this.logged = false;
    }
    else 
    {
      this.logged = true;
    }
  }

  onSubmit(form: NgForm){
    this.newSprint = form.form.value;
    this.newSprint.teamId = this.user.teamId;
    this.newSprint.dateCreated = new Date();
    this.newSprint.dateCompleted = new Date();
    this.sprintServ.createSprint(this.newSprint).subscribe( x => {
      window.location.href ='../sprint-details';
    });
  }

  getCurrentUser(){
    this.userServ.getCurrentUser().subscribe(result => {
      this.user = result;
      this.checkUser();
    });
  }

}
