
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Teams } from '../models/Teams';


@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  apiUri:string = "";

  constructor(private http: HttpClient, @Inject('BASE_URL')baseUri:string) 
  { 
    this.apiUri = '${baseUri}api/chuck'
    console.log(this.apiUri)
  }

  getAllTeams(){
    return this.http.get<Teams[]>(this.apiUri);
  }


}
