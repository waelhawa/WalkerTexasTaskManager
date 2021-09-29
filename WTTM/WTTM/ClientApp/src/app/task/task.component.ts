import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/Task';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService],
  
})
export class TaskComponent implements OnInit {
  @Input() task: Task;



  constructor(private taskServ: TaskService) { }
  

  ngOnInit(): void {
        
    }

    deleteTask(id: number) {
      this.taskServ.deleteTasks(id).subscribe();
      window.location.reload();
    }

  //get a list of unassigned tasks withing the sprint

  //make sure that the user ID is null
  //if userId == false, 

}
