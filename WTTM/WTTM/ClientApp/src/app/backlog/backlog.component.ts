import { Component, OnInit } from '@angular/core';
import { Task } from '../models/Task';
import { Users } from '../models/Users';
import { TaskService } from '../services/task.service';
import { UsersService } from '../services/users.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
  providers: [TaskService]
})
export class BacklogComponent implements OnInit {
  messageNone: string = "Mighty fine work partner! You don't have any tasks in your backlog.";
  empty: boolean = false;
  chuckGif: string ="/assets/images/Chuck Gif.gif";
  allUATasks: Task[] = [];
  allTasks: Task[]=[];
  logged: boolean = false;
  user: Users;




  constructor(private taskServ: TaskService, private userServ: UsersService) { }

  ngOnInit(): void {
    this.getAllUnassignedTasks();

  }

  checkUser() {
    if (this.user == null) {
      this.logged = false;
    }
    else {
      this.logged = true;
    }
  }



  getAllUnassignedTasks(){
    this.userServ.getCurrentUser().subscribe(result => {
      this.user = result;
      this.checkUser();
    });
    this.taskServ.getUnassignedTasks().subscribe(
      result => this.allUATasks = result
      //console.log(this.allUATasks)
    )
  }

}
