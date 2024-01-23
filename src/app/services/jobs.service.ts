import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jobs } from '../models/jobs.model';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }

  getJobs(){
    return this.http.get<Jobs>("assets/JSON/jobs.json");
  }
}
