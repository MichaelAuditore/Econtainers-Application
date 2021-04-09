import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferStateService {

  constructor(private http: HttpClient) { }

  public getHeroes(): Observable<any> {
    return this.getQuery('getHeroes')
  }

  public getQuery(query: string) {
    const URL = `http://localhost:4000/api/${query}`;

    return this.http.get<any>(URL);
  }

  public getHeroById(id: string) {
    const URL = `getHeroeById/${id}`;
    return this.getQuery(URL);
  }

  public getHeroesByName(name: string) {
    const URL = `getHeroesByName/${name}`;
    return this.getQuery(URL);
  }
}
