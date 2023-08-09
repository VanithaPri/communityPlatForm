import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private jsonDataUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}
  
  getJsonData(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonDataUrl);
  }
}
