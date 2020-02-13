import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignUpComponent } from './sign-up/sign-up.component';
import { MovieslistComponent } from './movieslist/movieslist.component'; 
import { MovieInfoComponent } from './movie-info/movie-info.component';

// FOR ROUTING AND NAVIGATION TO OTHER COMPONENTS
const routes: Routes = [
  { path: "", redirectTo: "Signup", pathMatch: "full" },
  { path: "Signup", component: SignUpComponent },
  {
    path: "Movies",
    component: MovieslistComponent
  },
  {
    path: "Movieinfo",
    component: MovieInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
