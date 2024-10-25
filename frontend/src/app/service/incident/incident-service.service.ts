import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Incident } from '../../model/incident';
import { tap } from 'rxjs/operators';


export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}


@Injectable({
  providedIn: 'root'
})



export class IncidentService {

  private basUrl = "http://localhost:8080/api"
  private incidentsCache: Incident[] | null = null;


  constructor(private httpClient: HttpClient) {
  }

   //GET all incidents
  getIncidentList(): Observable<Incident[]> {
    if (this.incidentsCache) {
      // Return cached data as an Observable
      return of(this.incidentsCache);
    } else {
      // Fetch data from API and cache it
      return this.httpClient.get<Incident[]>(`${this.basUrl}/findAllIncidents`).pipe(
        tap(data => this.incidentsCache = data)
      );
    }
  }


// GET all incidents per page with optional status filter
getIncidentListPerPage(pageNo: number, pageSize: number, status?: string): Observable<Page<Incident>> {
  let url = `${this.basUrl}/findAllIncidentsByPage?pageNo=${pageNo}&pageSize=${pageSize}`;
  
  if (status) {
    url += `&status=${status}`;
  }

  return this.httpClient.get<Page<Incident>>(url);
}

  

   //POST new incident
  createIncident(incident: Object): Observable<Object> {
    return this.httpClient.post(`${this.basUrl}/saveIncident`, incident);
  }

   //GET incident by Id
  getIncidentById(id: number): Observable<Incident>{
    return this.httpClient.get<Incident>(`${this.basUrl}/findIcidentById?id=${id}`);
  }
  
  //GET incidents by resolver Id
  getIncidentByResolverId(id: number): Observable<Incident[]>{
    return this.httpClient.get<Incident[]>(`${this.basUrl}/findIcidentByIdResolver?resolverId=${id}`);
  }

   //GET incident by title
  getIncidentByTitle(title: string): Observable<Incident>{
    return this.httpClient.get<Incident>(`${this.basUrl}/findIncidentByTitle?title=${title}`);
  }

   //GET incident by AppId
   getIncidentsByAppId(application_id: number): Observable<Incident[]>{
    return this.httpClient.get<Incident[]>(`${this.basUrl}/findIncidentByAppId?application_id=${application_id}`);
  }

   //GET Contributors by Incident Id
   getUsersByIncidentId(id: number): Observable<Incident>{
    return this.httpClient.get<Incident>(`${this.basUrl}/findContributorsByIncidentId?id=${id}`);
  }

  //UPDATE incident
  updateIncident(id:number, Object): Observable<Object>{
    return this.httpClient.put(`${this.basUrl}/updateIncident/${id}`, Object);
  }

  //DELETE incident
  deleteIncident(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.basUrl}/deleteIncident?id=${id}`);
  }
}
