import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from "@angular/router"
import { GetHeroIdService } from 'src/app/services/get-hero-id.service';
import { GetHeroNameService } from 'src/app/services/get-hero-name.service';
import { GetHeroesByName } from 'src/app/services/get-heroes-by-name';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  name = environment.application.name;
  angular = environment.application.angular;
  bootstrap = environment.application.bootstrap;
  fontawesome = environment.application.fontawesome;

  nHeroes: number;
  heroes: any[] = [];
  heroesObject: any;

  public response: any = this.router.snapshot.data.response;
  constructor(private router: ActivatedRoute,
    private route: Router,
    private changer: GetHeroIdService,
    private changerName: GetHeroNameService,
    private nameService: GetHeroesByName) {

  }

  ngOnInit(): void {
    this.heroes = this.response.response;
  }

  getHeroById(id: string) {
    this.changer.changeId(id);
    this.route.navigate(['hero', id]);
  }

  searchByName(name: string) {
    this.changerName.changeName(name);
    this.nameService.resolve().subscribe(heroes => {
      this.heroes = heroes.response;
    });
  }
}
