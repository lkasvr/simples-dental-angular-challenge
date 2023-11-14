import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album, AlbumsService, Photo } from '../../services/api/albums.service';
import { Observable, switchMap } from 'rxjs';
import { ImageCardComponent } from '../../components/image-card/image-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface FilteredPhoto extends Photo {
  userId: number;
  albumTitle: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, ImageCardComponent, MatIconModule, MatButtonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit{
  private loadData$!: Observable<Photo[]>;

  private _PHOTOS_QTY = 10;
  private albums: Album[] = [];
  filteredPhotos: FilteredPhoto[] = [];

  private _currentAlbumIndex = 0;
  currentPhotoIndex = 0;

  constructor(private albumsService: AlbumsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loadData$ = this.albumsService.getAlbums().pipe(
      switchMap((albums) => {
        this.albums = albums;
        return this.albumsService.getPhotos();
      })
    );

    this.loadData$.subscribe(photos => this.filterPhotos(photos));
  }

  private filterPhotos(photos: Photo[]) {
    let counterAlbums = 1;
    let counterPhotos = 0;

    this.filteredPhotos = photos.reduce((acc: FilteredPhoto[], photo,) => {
      if (counterAlbums === photo.albumId && counterPhotos < this._PHOTOS_QTY) {
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

  get currentPhoto(): FilteredPhoto | undefined {
    return this.filteredPhotos[this.currentPhotoIndex];
  }

  nextPhoto() {
    if (this.currentPhotoIndex < this.filteredPhotos.length - 1) {
      this.currentPhotoIndex++;
    } else if (this._currentAlbumIndex < this.albums.length - 1) {
      this._currentAlbumIndex++;
      this.currentPhotoIndex = 0;
    }
  }

  prevPhoto() {
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
    } else if (this._currentAlbumIndex > 0) {
      this._currentAlbumIndex--;
      this.currentPhotoIndex = this._PHOTOS_QTY - 1;
    }
  }

  showAlbum(albumId: number) {
    return this.filteredPhotos.filter(photo => photo.albumId === albumId);
  }

}
