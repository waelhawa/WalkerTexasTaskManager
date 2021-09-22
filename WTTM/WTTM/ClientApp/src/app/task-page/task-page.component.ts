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
  task: Task | undefined;
  num: number = 0;
  bandits: number[] = Array(this.num).fill(0, 20);

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
     this.taskServ.gettasksbyid(id).subscribe(task => this.task = task);
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

  save(): void{
    if(this.task){
      this.taskServ.upDateTask(this.task.taskId, this.task)
      .subscribe(() => this.goBack());
    }
  }





}
