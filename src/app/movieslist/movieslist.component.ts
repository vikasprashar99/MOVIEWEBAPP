import { Component, OnInit } from "@angular/core";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { StarRatingModule } from "angular-star-rating";
import { Router } from "@angular/router";
import { MovieserviceService } from "../movieservice.service";

// importing the db which has the movie data
import * as data from '../../db.json';

// DEFINED CLASS TO GET ALL THE DATA OF THE MOVIES
export class MOVIELIST {
  Sno: string;
  Moviename: string;
  Starrating: any;
  year: string;
  isfeatured: string;
}
@Component({
  selector: "app-movieslist",
  templateUrl: "./movieslist.component.html",
  styleUrls: ["./movieslist.component.css"],
  providers: [NgbRatingConfig] // FOR STAR RATINGS
})
export class MovieslistComponent implements OnInit {
  start;
  end;
  dataofmovies: MOVIELIST[] = []; // HOLDS 9 MOVIES AT FIRST
  Moviesvar: any[] = []; //VARIABLE ARRAY THAT HOLDS THE MOVIES LIST
  constructor(
    private router: Router,
    config: NgbRatingConfig,
    private Movieservice: MovieserviceService
  ) {
    config.max = 5;
    config.readonly = true;
  }
  ngOnInit() {
    this.getMovieData();
  }
  // TO GET THE MOVIES DATA
  getMovieData() {
    for (const e in data.Sheet1) {
      const ob = new MOVIELIST();
      ob.Sno = data.Sheet1[e].Sno;
      ob.Moviename = data.Sheet1[e].Moviename;
      ob.Starrating = data.Sheet1[e].Starrating;
      ob.year = data.Sheet1[e].Year;
      ob.isfeatured = data.Sheet1[e].isFeatured;
      this.dataofmovies.push(ob);
    }
    // DEFINING THE INITIAL MOVIES LIST THAT NEED TO BE SHOWN
    this.start = 0;
    this.end = 9;
    this.Moviesvar = this.dataofmovies.slice(this.start, this.end);
  }
  // LOAD MORE BUTTON
  loadmoreMovies() {
    // TO GET 9 MORE MOVIES LIST ON CLICK
    this.end = this.end + 9;
    this.Moviesvar = this.dataofmovies.slice(0, this.end);
  }
  //LOGOUT BUTTON
  Logout() {
    this.router.navigate(["/Signup"]);
  }

  // ONCLICKING A PARTICULAR MOVIE CARD
  movieInfo(data) {
    // DATA SENT TO OTHER COMPONENT THROUGH SERVICE
    this.Movieservice.moviename = data.Moviename;
    this.Movieservice.Rating = data.Starrating;
    this.router.navigate(["/Movieinfo"]);
  }
  // SORTING BY NAME, YEAR AND RATINGS
  SortByName() {
    return this.Moviesvar.sort((a, b) => (a.Moviename < b.Moviename ? -1 : 1));
  }
  SortByYear() {
    return this.Moviesvar.sort((a, b) => (a.year > b.year ? -1 : 1));
  }
  SortByRating() {
    return this.Moviesvar.sort((a, b) =>
      a.Starrating > b.Starrating ? -1 : 1
    );
  }
}
