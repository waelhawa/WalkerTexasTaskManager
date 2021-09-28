import { Component, OnInit, Input } from '@angular/core';
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
  @Input() sprint: Sprints;
  totalPoints: number = 0;

  constructor(private sprintServ: SprintService, private taskServ: TaskService) { }

  ngOnInit(): void {
    this.getPointCount();

  }

  deleteSprint(id: number) {
    this.sprintServ.deleteSprint(id).subscribe();
    window.location.reload();
  }

  getPointCount(){
    this.taskServ.getTasksBySprintId(this.sprint.sprintId).subscribe(result => {
      result.forEach(element => {
        this.totalPoints += element.storyPoint;
      });
      this.sprint.totalStoryPoint = this.totalPoints;
    });
  }

}
