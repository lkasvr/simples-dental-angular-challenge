import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album, AlbumsService, Photo } from '../../services/api/albums.service';
import { Observable, switchMap } from 'rxjs';

interface FilteredAlbum extends Photo {
  userId: number;
  albumTitle: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

  private loadData$!: Observable<Photo[]>;

  filteredPhotos: FilteredAlbum[] = [];
  albums: Album[] = [];

  constructor(private albumsService: AlbumsService) {
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
    let albumTitle: string, userId: number;
    let counterAlbums = 1;
    let counterPhotos = 1;

    photos.forEach((photo, i) => {
      if (i === 0 || counterAlbums !== photo.albumId) {
        counterAlbums = photo.albumId;
        counterPhotos = 1;
      }

      const isWithinLimit = counterPhotos <= 10;
      const isSameAlbum = counterAlbums === photo.albumId;

      if (isSameAlbum && isWithinLimit) {
        if (counterAlbums === 1) {
          albumTitle = this.albums[counterAlbums - 1].title;
          userId = this.albums[counterAlbums - 1].userId;
        }
        this.filteredPhotos.push({ albumTitle, userId, ...photo })
        counterPhotos++
      };
    })
  }
}
