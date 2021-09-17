import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ChuckJoke } from '../models/ChuckJoke';

@Injectable({
  providedIn: 'root'
})
export class ChuckJokeService {

  apiUri: string = "";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUri: string) {
    this.apiUri = `${baseUri}/api/chuck`;
   }

   getRandomJoke(){
      return this.http.get<ChuckJoke>(`${this.apiUri}/getrandomjoke`);
   }

   getJoke(category: string){
      return this.http.get<ChuckJoke>(`${this.apiUri}/getjoke/${category}`);
   }
}
