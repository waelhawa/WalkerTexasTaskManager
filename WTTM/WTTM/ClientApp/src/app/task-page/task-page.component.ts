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
  task: Task;
  num: number = 0;
  chuckGif: string ="/assets/images/Chuck Gif.gif";
  randomChuckJoke: Observable<ChuckJoke>;

  constructor(
    private taskServ: TaskService,
    private chuckServ: ChuckJokeService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getTask();
    this.bringBandits();
  }

  getTask():void{
     const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
     this.taskServ.gettasksbyid(id).subscribe(task => {
      this.task = task;
     });
    // const routeParams = this.route.snapshot.paramMap;
    // let id: number = Number(routeParams.get(id));
    // this.task = this.taskServ.gettasksbyid(id);
  }

  bringBandits(){

    this.num = this.task.storyPoint;

  }


  goBack(): void{
    this.location.back();
  }

  save(){
      this.taskServ.upDateTask(this.task.taskId, this.task).subscribe()
      //this.goBack();
  }

  completeTask(): void{
    this.task.isCompleted = true;
    this.save();
  }

  getChuckJoke(){
    this.randomChuckJoke = this.chuckServ.getRandomJoke();
   }

  kickBandit(): number{
    if (this.task.scoreKeep < this.task.storyPoint) {
    this.task.scoreKeep += 1;
    return this.task.scoreKeep;
    }
    else {
      this.completeTask();
      return this.task.scoreKeep;
    }
    alert(this.randomChuckJoke);
  }

  undoKick(){
    this.task.scoreKeep -= 1;
    //return this.scoreKeep;
  }





}
