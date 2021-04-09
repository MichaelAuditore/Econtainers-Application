import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { TransferStateService } from './transfer-state.service';
import { takeUntil } from 'rxjs/operators';
import { GetHeroIdService } from './get-hero-id.service';

@Injectable({
  providedIn: 'root'
})
export class GetHeroById implements Resolve<any> {
  heroIdtoSearch: string;

  constructor(private service: TransferStateService,
    private heroId: GetHeroIdService,
    @Inject(PLATFORM_ID) private platformId: any) { }

  public resolve(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      this.heroId.heroId$.subscribe((res) => {
        this.heroIdtoSearch = res;
      });
      return this.service.getHeroById(this.heroIdtoSearch);
    }

    const watchdog: Observable<number> = timer(2000);

    return Observable.create(subject => {
      this.service.getHeroesByName(this.heroIdtoSearch).pipe(takeUntil(watchdog)).subscribe(response => {
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