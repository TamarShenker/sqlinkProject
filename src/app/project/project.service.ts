import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {ProjectStoreRepository} from "./project.store";

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient,
              private projectStoreRepository:ProjectStoreRepository) {
  }

  getProjects(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<any>('https://private-052d6-testapi4528.apiary-mock.com/info', httpOption).pipe(
      map((projectsDetails) =>
        this.projectStoreRepository.setProjects(projectsDetails)),
        catchError((err) => {
        console.log('failed loading disconnected projects per user', err);
        return throwError(() => err);
      })
    );
  }
}
