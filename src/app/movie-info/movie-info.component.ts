import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbRatingConfig, NgbCarousel } from "@ng-bootstrap/ng-bootstrap";
import { MovieserviceService } from "../movieservice.service";
import * as data from "../../db.json";
import { NgxCarousel } from "ngx-carousel";

export class MOVIELIST {
  Sno: string;
  Moviename: string;
  Starrating: any;
  year: string;
  isfeatured: string;
}

@Component({
  selector: "app-movie-info",
  templateUrl: "./movie-info.component.html",
  styleUrls: ["./movie-info.component.css"]
})
export class MovieInfoComponent implements OnInit {
  
  FeaturedDataofMovies: MOVIELIST[] = [];
  Movienamevar;
  Ratingsvar;
  constructor(
    private router: Router,
    config: NgbRatingConfig,
    private Service:MovieserviceService
  ) {
    // FOR STARS
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    this.Movienamevar=this.Service.moviename;
    this.Ratingsvar=this.Service.Rating;
    for (const e in data.Sheet1) {
      const ob=new MOVIELIST();
      if (data.Sheet1[e].isFeatured == "TRUE") {
        //TO SELECT ONLY FEATURED MOVIES
        ob.Moviename = data.Sheet1[e].Moviename;
        ob.Starrating = data.Sheet1[e].Starrating;
        this.FeaturedDataofMovies.push(ob);
      }
    }
  }
 
  // OPTIONS FOR CARSOUEL
  customOptions: any = {
    loop: true,
    margin:20,
    width:300,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    navSpeed: 300,    
  navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  // NAVIGATING BUTTONS
  back(){
    this.router.navigate(["/Movies"])
  }
  Logout(){
    this.router.navigate(["/Signup"])
  }
}