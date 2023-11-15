import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, switchMap, take, tap } from 'rxjs';
import { Album, AlbumsService, Photo } from '../../api/albums-service/albums.service';

export interface FilteredPhoto extends Photo {
  userId: number;
  albumTitle: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlbumsDataSharedService {

  private _loadData$!: Observable<Photo[]>;

  private _PHOTOS_QTY = 10;
  private _albums$ = new BehaviorSubject<Album[]>([]);
  private _photos$ = new BehaviorSubject<Photo[]>([]);
  private _filteredPhotos$ = new BehaviorSubject<FilteredPhoto[]>([]);
  dataLoaded = false;

  constructor(private _albumsService: AlbumsService) {
    this.loadData();
  }

  private loadData() {
    console.log('this.filteredPhotos', this._filteredPhotos$, this.dataLoaded);

    if (!this.dataLoaded) {
      this._loadData$ = this._albumsService.getAlbums().pipe(
        switchMap((albums) => {
          this._albums$.next(albums);
          return this._albumsService.getPhotos();
        }),
        tap(photos => {
          this._photos$.next(photos);
          this._filteredPhotos$.next(this.filterPhotos(photos));
          this.dataLoaded = true;
        }),
        shareReplay(1)
      );
    }

    this._loadData$.pipe(take(1)).subscribe();

    return this;
  }

  get filteredPhotos() {
    return this._filteredPhotos$.value;
  }

  get filteredPhotos$(): Observable<FilteredPhoto[]> {
    return this._filteredPhotos$.asObservable();
  }

    get photos() {
    return this._photos$.value;
  }

  get albums() {
    return this._albums$.value;
  }

  get albums$(): Observable<Album[]> {
    return this._albums$.asObservable();
  }

  filterPhotos(photos: Photo[]): FilteredPhoto[] {
    let counterAlbums = 1;
    let counterPhotos = 1;

    return photos.reduce((acc: FilteredPhoto[], photo) => {
      if (counterAlbums === photo.albumId && counterPhotos <= this._PHOTOS_QTY) {
        const albumTitle = this.albums.find(album => album.id === photo.albumId)?.title ?? '';
        const userId = this.albums.find(album => album.id === photo.albumId)?.userId ?? 0;

        acc.push({ albumTitle, userId, ...photo });
        counterPhotos++;
      } else if (counterAlbums !== photo.albumId) {
        counterAlbums = photo.albumId;
        counterPhotos = 0;
      }

      return acc;
    }, []);
  }
}
