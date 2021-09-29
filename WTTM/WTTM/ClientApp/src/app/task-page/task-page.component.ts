import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';
import { TaskComponent } from '../task/task.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BanditComponent } from '../bandit/bandit.component';
import { ChuckJoke } from '../models/ChuckJoke';
import { Observable } from 'rxjs';
import { ChuckJokeService } from '../services/chuck-joke.service';
import { NgForm } from '@angular/forms';
import { Sprints } from '../models/Sprints';
import { SprintService } from '../services/sprint.service';
import { User } from 'oidc-client';
import { Users } from '../models/Users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
  providers: [TaskService]
})
export class TaskPageComponent implements OnInit {
  @Input() task: Task;
  num: number = 0;
  chuckGif: string = "/assets/images/Chuck Gif.gif";
  jokeUp: boolean = false;
  joke: ChuckJoke;
  sprints: Sprints[];
  user: Users;
  userName: string;
    // = {
    //   categories: [],
    //   created_at: "",
    //   icon_url: "",
    //   id: "",
    //   updated_at: "",
    //   url: "",
    //   value: ""
    // };

  constructor(
    private taskServ: TaskService,
    private chuckServ: ChuckJokeService,
    private route: ActivatedRoute,
    private location: Location,
    private sprintServ: SprintService,
    private userServ: UsersService
  ) { }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.taskServ.gettasksbyid(id).subscribe(result => {
      this.task = result;
      this.userServ.getCurrentUser().subscribe(result2 => {
        this.user = result2;
        if (result.userId != null){
          this.userName = result2.userName;
        }
        else {
          this.userName = "None";
        }
        this.sprintServ.getSprintsByTeamId(this.user.teamId).subscribe(result3 => {
          this.sprints = result3;
      })
      })
    });
  }

  bringBandits() {

    this.num = this.task.storyPoint;

  }


  goBack(): void {
    this.location.back();
  }

  save() {
    this.taskServ.upDateTask(this.task.taskId, this.task).subscribe()
  }

  completeTask(): void {
    this.task.isCompleted = true;
    this.task.taskStatus = "Completed";
    this.task.dateCompleted = new Date();
    this.save();
    window.location.href=`../sprint-page/${this.task.sprintId}`;
  }

  claimTask(){
    this.task.userId = this.user.id;
    this.userName = this.user.userName;
    this.save();
  }

  unclaimTask(){
    this.task.userId = null;
    this.userName = "None"
    this.save();
  }

  getChuckJoke() {
    this.chuckServ.getRandomJoke().subscribe(result => {
      console.log(result);
      this.joke = result;
    });
    console.log(this.joke);
  }

  kickBandit(): number {
    this.getChuckJoke();
    this.jokeUp = true;
    this.task.scoreKeep += 1;
    this.save();
    return this.task.scoreKeep;

  }

  undoKick() {
    if (this.task.scoreKeep > 0){
    this.task.scoreKeep -= 1;
    this.save();
    }
    //return this.scoreKeep;
  }

  closeJoke(): boolean {
    this.jokeUp = false;
    console.log(this.jokeUp);
    return this.jokeUp;
  }

  assignToSprint(form: NgForm){
    this.task.sprintId = form.form.value.sprintId;
    this.taskServ.upDateTask(this.task.taskId, this.task).subscribe();
  }

  assignTaskStatus(form: NgForm){
    this.task.taskStatus = form.form.value.taskStatus;
    this.taskServ.upDateTask(this.task.taskId, this.task).subscribe();
  }





}
