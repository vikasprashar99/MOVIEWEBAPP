import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbRatingConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { MovieserviceService } from '../movieservice.service';
// importing the db which has the movie data
import * as data from '../../db.json';

// DEFINED CLASS TO GET DATA OF FEATURED MOVIES THE MOVIES 
export class MOVIELIST{
  Moviename:string;
  Starrating:any;
}

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
 FeaturedDataofMovies:MOVIELIST[]=[];
  Movienamevar;
  Ratingsvar;
  constructor(private router:Router,config: NgbRatingConfig, private Movieservice: MovieserviceService) {
    // FIXING THE MAXIMUM STAR RATINGS
    config.max = 5;
    config.readonly = true;
   }

  ngOnInit() {
    // TO GET THE DETAILS OF SLECTED MOVIE CARD
this.Movienamevar=this.Movieservice.moviename
this.Ratingsvar=this.Movieservice.Rating;

for(const e in data.Sheet1){
  const ob=new MOVIELIST();
  if(data.Sheet1[e].isFeatured== "TRUE"){   //TO SELECT ONLY FEATURED MOVIES
  ob.Moviename=data.Sheet1[e].Moviename;
  ob.Starrating=data.Sheet1[e].Starrating;
  this.FeaturedDataofMovies.push(ob)
  }
}

}

  // NAVIGATING BUTTONS
  back(){
    this.router.navigate(['/Movies'])
  }
  Logout(){
    this.router.navigate(['/Signup'])
  }

  
}
