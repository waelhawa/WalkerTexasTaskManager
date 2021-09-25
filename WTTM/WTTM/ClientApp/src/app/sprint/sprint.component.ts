import { Component, OnInit, Input } from '@angular/core';
import { Sprints } from '../models/Sprints';
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
  @Input() sprint: Sprints;

  constructor( ) { }

  ngOnInit(): void {

  }


}
