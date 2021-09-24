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
  joke: ChuckJoke =
    {
      categories: [],
      created_at: "",
      icon_url: "",
      id: "",
      updated_at: "",
      url: "",
      value: ""
    };

  constructor(
    private taskServ: TaskService,
    private chuckServ: ChuckJokeService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTask();
    //this.bringBandits();
    this.getChuckJoke();
  }

  getTask(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.taskServ.gettasksbyid(id).subscribe(result => {
      this.task = result;
      console.log(this.task);
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
    this.save();
  }

  getChuckJoke() {
    this.chuckServ.getRandomJoke().subscribe(result => {
      console.log(result);
      this.joke.categories = result.categories;
      this.joke.created_at = result.created_at;
      this.joke.icon_url = result.icon_url;
      this.joke.id = result.id;
      this.joke.updated_at = result.updated_at;
      this.joke.url = result.url;
      this.joke.value = result.value;
    });
    console.log(this.joke);
  }

  kickBandit(): number {
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
    this.jokeUp == false;
    return this.jokeUp;
  }





}
