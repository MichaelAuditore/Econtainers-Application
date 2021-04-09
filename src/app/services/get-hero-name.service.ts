import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetHeroNameService {
  private heroName = new BehaviorSubject('');

  heroName$ = this.heroName.asObservable();

  changeName(name: string) {
    this.heroName.next(name);
  }
}