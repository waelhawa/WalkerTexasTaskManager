import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';
import { TaskComponent } from '../task/task.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
  providers: [TaskService]
})
export class TaskPageComponent implements OnInit {
  task: Task | undefined;


  constructor(
    private taskServ: TaskService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask():void{
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.taskServ.gettasksbyid(id).subscribe(task => this.task = task);
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
