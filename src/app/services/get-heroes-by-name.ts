import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { TransferStateService } from './transfer-state.service';
import { takeUntil } from 'rxjs/operators';
import { GetHeroNameService } from './get-hero-name.service';

@Injectable({
  providedIn: 'root'
})
export class GetHeroesByName implements Resolve<any> {
  heroNametoSearch: string;

  constructor(private service: TransferStateService,
    private heroName: GetHeroNameService,
    @Inject(PLATFORM_ID) private platformId: any) { }

  public resolve(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      this.heroName.heroName$.subscribe((res) => {
        this.heroNametoSearch = res;
      });
      return this.service.getHeroesByName(this.heroNametoSearch);
    }

    const watchdog: Observable<number> = timer(5000);

    return Observable.create(subject => {
      this.service.getHeroesByName(this.heroNametoSearch).pipe(takeUntil(watchdog)).subscribe(response => {
        subject.next(response);
        subject.complete();
      });
      watchdog.subscribe(() => {
        subject.next(null);
        subject.complete();
      });
    });
  }
}