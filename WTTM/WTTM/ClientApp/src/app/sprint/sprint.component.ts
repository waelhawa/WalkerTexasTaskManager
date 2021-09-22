import { Component, OnInit } from '@angular/core';
import { Sprints } from '../models/Sprints';
import { SprintService } from '../services/sprint.service';


@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
  providers: [SprintService]
  
})
export class SprintComponent implements OnInit {

  getAllSprints: Sprints[] = [];
  allSprints: Sprints[] = [];

  constructor( private sprintServe: SprintService) { }

  ngOnInit(): void {

   this.getSprints();
   
  }

  getSprints(){
    this.sprintServe.getSprints().subscribe(
      result => this.getAllSprints = result
    )
  }

}
