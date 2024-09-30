import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CitySearchService } from '../city-search.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Search } from '../search';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.css'
})
export class CitySearchComponent {

  private readonly searchService: CitySearchService = inject(CitySearchService)
  cities: Search[] = [];
  noResultsMessage: string = "";
  value: string = "";
  error: string = "";

  onSearch(value: string) {
    console.log(value);
    this.value = value;

    if(value) {
      this.searchService.searchCity(value)
      .pipe(
        catchError(this.handleSearchFetchFailure.bind(this))
      )
      .subscribe(this.handleSearchFetchSuccess.bind(this));
    } else {
      this.cities = [];
    }
    
  }

  handleSearchFetchSuccess(searchData: Search[]) {
    if(searchData.length === 0) {
      this.noResultsMessage = `Couldn't find any cities with the name ${this.value}`
    } else {
      this.cities = searchData;
    }
  }

  handleSearchFetchFailure(error: HttpErrorResponse, caught: Observable<Search[]>): Observable<Search[]> {
    this.error = error.message;
    return throwError(() => new Error(error.message));
  }

}
