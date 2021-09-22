
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Teams } from '../models/Teams';


@Injectable({
  providedIn: 'root'
})

export class TeamsService {
  apiUri:string = "";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUri:string) 
  { 
    this.apiUri = `${baseUri}/api/teams`;

    
  }

  //Read
  getTeams(){
    return this.http.get<Teams[]>(`${this.apiUri}/getteams`);
  }

  getTeamById(id:number)
  {
    return this.http.get<Teams>(`${this.apiUri}/getteamsbyid/${id}`);
  }

  //Create
  createNewTeam(teams: Teams)
  {
    return this.http.post<Teams>(`${this.apiUri}/createnewteam`,{"teamName": teams.teamName, "teamPoints": teams.teamPoints});
  }
  
  //Delete
  deleteTeam(id:number)
  {
    return this.http.delete(`${this.apiUri}/deleteteam/${id}`);
  }
  //Update
  upDateTeams(id:number, teams:Teams)
  {
    return this.http.put<Teams>(`${this.apiUri}/updateteam/${id}`, teams);
  }
  
}
