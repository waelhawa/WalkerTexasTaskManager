import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUri: string = "";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUri: string) {
    this.apiUri = `${baseUri}/api/Users`;
   }

   //Read
   getUsers() {
      return this.http.get<Users[]>(`${this.apiUri}/getusers`);
   }

   getCurrentUser(): Observable<string>{
    return this.http.get<{id}>(`${this.apiUri}/getcurrentuser`).pipe(map(({id})=>{return id}))
   }

   getUsersById(id: string){
    return this.http.get<Users>(`${this.apiUri}/getusersbyid/${id}`);
   }

   getUsersByUserName(userName: string){
    return this.http.get<Users>(`${this.apiUri}/getusersbyusername/${userName}`);
   }

   getUsersByEmail(email: string){
    return this.http.get<Users>(`${this.apiUri}/getusersbyemail/${email}`);
   }

   getUsersByPhoneNumber(phoneNumber: string){
    return this.http.get<Users>(`${this.apiUri}/getusersbyphonenumber/${phoneNumber}`);
   }

   getUsersByTeamId(id: number){
    return this.http.get<Users[]>(`${this.apiUri}/getusersbyid/${id}`);
   }

   //Create
  //  createUser(user: Users){
  //   return this.http.post<Users>(`${this.apiUri}/createuser`, user);
  //  }

   //Delete
   deleteUser(id: string){
    return this.http.delete<Users>(`${this.apiUri}/deleteuser/${id}`);
   }

   //Update
   updateUser(id: string, user: Users){
     return this.http.put<Users>(`${this.apiUri}/updateuser/${id}`, user);
   }
}
