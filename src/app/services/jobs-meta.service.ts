import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsMetaService {

  constructor(private http: HttpClient) { }

  getJobsMeta(){
    return this.http.get<any>("assets/JSON/jobs-meta.json");
  }
}
