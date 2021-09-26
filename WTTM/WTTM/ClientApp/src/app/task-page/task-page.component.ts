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
    private sprintServ: SprintService
  ) { }

  ngOnInit(): void {
    this.getTask();
    //this.bringBandits();
    //this.getChuckJoke();
  }

  getTask(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.taskServ.gettasksbyid(id).subscribe(result => {
      this.task = result;
      this.sprintServ.getSprints().subscribe(result => {
        this.sprints = result;
      })
    });
    // const routeParams = this.route.snapshot.paramMap;
    // let id: number = Number(routeParams.get(id));
    // this.task = this.taskServ.gettasksbyid(id);
  }

  bringBandits() {

    this.num = this.task.storyPoint;

  }


  goBack(): void {
    this.location.back();
  }

  save() {
    this.taskServ.upDateTask(this.task.taskId, this.task).subscribe()
    //this.goBack();
  }

  completeTask(): void {
    this.task.isCompleted = true;
    this.task.dateCompleted = new Date();
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
    if (this.task.scoreKeep < this.task.storyPoint) {
      this.task.scoreKeep += 1;
      return this.task.scoreKeep;
    }
    else {
      this.completeTask();
      return this.task.scoreKeep;
    }

  }

  undoKick() {
    this.task.scoreKeep -= 1;
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





}
