import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonCard, IonAvatar, IonInfiniteScroll, IonInfiniteScrollContent, IonSearchbar } from '@ionic/angular/standalone';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { CharactersInterface, Result } from 'src/app/interfaces/characters.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonInfiniteScrollContent, IonInfiniteScroll, IonAvatar, IonCard, IonRow, IonCol, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class PrincipalPage implements OnInit {

  characters: Result[] = [];
  params = { page: 1, name: '' };
  loading: boolean = false; // Bandera para controlar la carga
  error: boolean = false; // Bandera para controlar el error

  constructor(
    private _rickAndMortyServ: RickAndMortyService
  ) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters(event?: any) {
    if (this.loading) return; 
    this.loading = true; 
    this.error = false;

    this._rickAndMortyServ.getCharacters(this.params).subscribe({
      next: (res: CharactersInterface) => {
        if (this.params.page === 1) {
          this.characters = res.results; 
        } else {
          this.characters.push(...res.results); 
        }
        this.loading = false; 
        if (event) {
          event.target.complete();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error al obtener personajes', error);
        if (error.status === 404) {
          this.characters = [];
        } else {
          this.error = true;
        }
        this.loading = false; 
        if (event) {
          event.target.complete();
        }
      },
    });
  }

  loadMore(event: any) {
    this.params.page += 1; 
    setTimeout(() => {
      this.getCharacters(event);
    }, 1500); 
  }

  searchCharacters() {
    this.params.page = 1; 
    this.getCharacters(); 
  }

}
