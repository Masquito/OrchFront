import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Test } from '../models/test';

@Injectable({
  providedIn: 'root'
})

export class APICOMMService {

  constructor(private http: HttpClient) { }

  configUrl = 'https://localhost:7023/api/Test';

  getConfig() {
    return this.http.get<Test>(this.configUrl);
  }
}
