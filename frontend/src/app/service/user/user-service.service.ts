import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../model/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basUrl = "http://localhost:8080/api"
  private agentCache: User[] | null = null;
  private devCache: User[] | null = null;
  private managerCache: User[] | null = null;
  private adminCache: User[] | null = null;
  private testerCache: User[] | null = null;

  constructor(private httpClient: HttpClient) {
  }




//GET all users
  getUserList(): Observable<User[]> {
    if(this.agentCache) {
      return of(this.agentCache);
    } else {
      return this.httpClient.get<User[]>(`${this.basUrl}/findAllUsers`).pipe(
        tap(data => this.agentCache = data));
    }
  }

//POST new user
  createUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.basUrl}/saveUser`, user);
  }

//GET user by Id
  getUserById(id: number): Observable<User>{
    return this.httpClient.get<User>(`${this.basUrl}/findUserById?id=${id}`);
    
  }

//GET user by email
  getUserByEmail(email: string): Observable<User>{
    return this.httpClient.get<User>(`${this.basUrl}/findUserByEmail?email=${email}`);
  }

//UPDATE user
  updateUser(id:number, user:User): Observable<Object>{
    return this.httpClient.put(`${this.basUrl}/updateUser/${id}`, user);
  }

//DELETE user
  deleteUser(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.basUrl}/deleteUser?id=${id}`);
  }

  
//Check if user role , by user id and role id 
existsByUserIdAndRoleId(userId: number, roleId: number): Observable<Boolean> {
  
  return this.httpClient.get<Boolean>(`${this.basUrl}/exists/userRole?userId=${userId}&roleId=${roleId}`);
}

// GET Users by role id 
getUsersByRoleId(roleId: number) : Observable<User[]> {
  
  if (roleId == 1 ){
    if(this.devCache) {
      return of(this.devCache);
    } else {
      return this.httpClient.get<User[]>(`${this.basUrl}/UsersByRoleId?roleId=${roleId}`).pipe(
        tap(data => this.devCache = data));
    }
  }
   else if (roleId == 2 ){
    if(this.managerCache) {
      return of(this.managerCache);
    } else {
      return this.httpClient.get<User[]>(`${this.basUrl}/UsersByRoleId?roleId=${roleId}`).pipe(
        tap(data => this.managerCache = data));
    }
  }

  else if (roleId == 3 ){
    if(this.adminCache) {
      return of(this.adminCache);
    } else {
      return this.httpClient.get<User[]>(`${this.basUrl}/UsersByRoleId?roleId=${roleId}`).pipe(
        tap(data => this.adminCache = data));
    }
  }
  else if (roleId == 4 ){
    if(this.testerCache) {
      return of(this.testerCache);
    } else {
      return this.httpClient.get<User[]>(`${this.basUrl}/UsersByRoleId?roleId=${roleId}`).pipe(
        tap(data => this.testerCache = data));
    }
  }
} 


} 

