import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Sprints } from '../models/Sprints';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  apiUri: string = "";

  constructor(private http:HttpClient, @Inject('BASE_URL') baseUri: string) {
    this.apiUri = `${baseUri}api/sprints`;
   }

   //Read
   getSprints() {
      return this.http.get<Sprints[]>(`${this.apiUri}/getsprints`);
   }

   getSprintsById(id: number){
     return this.http.get<Sprints>(`${this.apiUri}/getsprintsbyid/${id}`);
   }

   getSprintsByTeamId(id: number){
    return this.http.get<Sprints[]>(`${this.apiUri}/getsprintsbyteamid/${id}`);
   }

   getIncompletedSprints(){
    return this.http.get<Sprints[]>(`${this.apiUri}/getincompletedsprints`);
   }

   //Create
   createSprint(sprint: Sprints){
    return this.http.post<Sprints>(`${this.apiUri}/createsprint`, {"teamId": sprint.teamId, "dateCreated": sprint.dateCreated, "dateCompleted": sprint.dateCompleted, "isCompleted": false, "sprintStatus": sprint.sprintStatus, "totalStoryPoints": 0});
   }

   //Delete
   deleteSprint(id: number){
    return this.http.delete(`${this.apiUri}/deletesprint/${id}`);
   }

   //Update
   updateSprint(id: number, sprint: Sprints){
    return this.http.put<Sprints>(`${this.apiUri}/updatesprint/${id}`, sprint);
   }

}