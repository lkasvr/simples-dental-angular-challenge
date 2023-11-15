import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsDataSharedService, FilteredPhoto } from '../../services/data-shared/albums/albums-data-shared.service';
import { ImageCardComponent } from '../../components/image-card/image-card.component';
import { AlbumsService, Photo } from '../../services/api/albums-service/albums.service';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'album',
  standalone: true,
  imports: [CommonModule, ImageCardComponent],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
  providers: [AlbumsService, AlbumsDataSharedService]
})
export class AlbumComponent implements OnInit {

  private _album$ = new BehaviorSubject<FilteredPhoto[]>([]);;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _albumsDataSharedService: AlbumsDataSharedService)
  {}

  ngOnInit() {
    const albumId = this._activatedRoute.snapshot.paramMap.get('id');
    this._albumsDataSharedService.filteredPhotos$.subscribe(photos => this._album$.next(photos.filter(photo => photo.albumId === Number(albumId))));
  }

  get album() {
    return this._album$.value;
  }

  set album(value: FilteredPhoto[]) {
    this._album$.next(value)
  }
}
