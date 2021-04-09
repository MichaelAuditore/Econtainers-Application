import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetHeroIdService {
  private heroId = new BehaviorSubject('');

  heroId$ = this.heroId.asObservable();

  changeId(id: string) {
    this.heroId.next(id);
  }
}