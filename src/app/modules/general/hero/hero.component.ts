import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  heroInfo: any;

  public response: any = this.router.snapshot.data.response;
  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.heroInfo = JSON.parse(this.response.response);
  }

}
