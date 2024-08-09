import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonAvatar, IonLabel, IonItem, IonIcon, IonGrid, IonCol, IonRow, IonCardContent, IonCard, IonSpinner } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { Result } from 'src/app/interfaces/characters.interface';
import { EpisodesInterface } from 'src/app/interfaces/episodes.interface';
import { catchError, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonCard, IonCardContent, IonRow, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonAvatar, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CharacterDetailPage implements OnInit {

  characterId: string = '';
  character!: Result;
  episodes: EpisodesInterface[] = [];
  isLoading:boolean = true;
  error:boolean = false;

  constructor(
    private actiRoute: ActivatedRoute,
    private _rickAndMortyServ: RickAndMortyService
  ) {
    this.characterId = this.actiRoute.snapshot.paramMap.get('id') as string;
   }

  ngOnInit() {
    this.getCharacter();
  }

  getCharacter() {
    this._rickAndMortyServ.getCharactersById(this.characterId).pipe(
      map((res: Result) => {
        this.character = res;
        return this.character.episode.map(url => this._rickAndMortyServ.getByUrl(url));
      }),
      catchError((error) => {
        this.error = true;
        this.isLoading = false;
        console.error('Error al obtener el personaje:', error);
        return [];
      })
    ).subscribe((episodeRequests) => {
      forkJoin(episodeRequests).subscribe({
        next: (episodes: EpisodesInterface[]) => {
          this.episodes = episodes;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = true;
          this.isLoading = false;
          console.error('Error al obtener episodios:', error);
        }
      });
    });
  }

}
