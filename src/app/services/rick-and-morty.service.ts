import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CharactersInterface, Result } from '../interfaces/characters.interface';
import { EpisodesInterface } from '../interfaces/episodes.interface';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  private API:string = environment.baseUrl; 

  constructor(private http: HttpClient) { }

  getCharacters(params: any) {
    return this.http.get<CharactersInterface>(this.API + '/character/', { params });
  }

  getCharactersById(id: string) {
    return this.http.get<Result>(this.API + '/character/' + id);
  }

  getByUrl(url: string) {
    return this.http.get<EpisodesInterface>(url);
  }
}
