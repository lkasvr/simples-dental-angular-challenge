import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { AlbumsDataSharedService, FilteredPhoto } from '../../services/data-shared/albums/albums-data-shared.service';
import { ImageCardComponent } from '../../components/image-card/image-card.component';
import { AlbumsService } from '../../services/api/albums-service/albums.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'album',
  standalone: true,
  imports: [CommonModule, ImageCardComponent, MatDividerModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
  providers: [AlbumsService, AlbumsDataSharedService]
})
export class AlbumComponent implements OnInit {

  private _album$ = new BehaviorSubject<FilteredPhoto[]>([]);;
  albumTitle!: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _albumsDataSharedService: AlbumsDataSharedService)
  {}

  ngOnInit() {
    const albumId = this._activatedRoute.snapshot.paramMap.get('id');
    this._albumsDataSharedService.filteredPhotos$.subscribe(photos => this._album$.next(photos.filter(photo => photo.albumId === Number(albumId))));
    this.albumTitle = this.album[0].albumTitle;
  }


  get album() {
    return this._album$.value;
  }

  set album(value: FilteredPhoto[]) {
    this._album$.next(value)
  }
}
