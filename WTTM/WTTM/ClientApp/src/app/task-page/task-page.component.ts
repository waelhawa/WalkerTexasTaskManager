import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';
import { TaskComponent } from '../task/task.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BanditComponent } from '../bandit/bandit.component';

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


  constructor(
    private taskServ: TaskService,
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
      task.scoreKeep = 0;
      this.task = task;

     });
    // const routeParams = this.route.snapshot.paramMap;
    // let id: number = Number(routeParams.get(id));
    // this.task = this.taskServ.gettasksbyid(id);
  }

  bringBandits(){
    if(this.task.scoreKeep === null){
      this.task.scoreKeep == 0;
    }
    this.num = this.task.storyPoint;
  }


  goBack(): void{
    this.location.back();
  }

  save(): void{
    if(this.task){
      this.taskServ.upDateTask(this.task.taskId, this.task)
      .subscribe(() => this.goBack());
    }
  }

  kickBandit(): number{
    this.task.scoreKeep += 1;
    return this.task.scoreKeep;
  }

  undoKick(){
    this.task.scoreKeep -= 1;
    //return this.scoreKeep;
  }





}
