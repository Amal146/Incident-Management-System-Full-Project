import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Application } from '../../model/application';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApplicationService {

  private basUrl = "http://localhost:8080/api"
  private applicationsCache: Application[] | null = null;


  constructor(private httpClient: HttpClient) {
  }

  //GET all applications
  getAppList(): Observable<Application[]> {
    if (this.applicationsCache) {
      // Return cached data as an Observable
      return of(this.applicationsCache);
    } else {
      // Fetch data from API and cache it
      return this.httpClient.get<Application[]>(`${this.basUrl}/findAllApplications`).pipe(
        tap(data => this.applicationsCache = data)
      );
    }
  }

  //GET Application by Id
  getAppById(id: number): Observable<Application>{
    return this.httpClient.get<Application>(`${this.basUrl}/findAppById?id=${id}`);
  }

  //GET Application by Id
  getAppByManagerId(id: number): Observable<Application[]>{
    return this.httpClient.get<Application[]>(`${this.basUrl}/findAppByManagerId?id=${id}`);
  }

  //POST new application
  createApp(application: Application): Observable<Object> {
    return this.httpClient.post(`${this.basUrl}/saveApp`, application);
  }
  //UPDATE application
  updateapplication(id:number, application: Application): Observable<Object>{
    return this.httpClient.put(`${this.basUrl}/updateApplication/1?id=${id}`, application);
  }

  //DELETE application
  deleteapplication(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.basUrl}/deleteApplication?id=${id}`);
  }

}
