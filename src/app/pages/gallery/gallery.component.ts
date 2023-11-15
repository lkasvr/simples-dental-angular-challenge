import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album } from '../../services/api/albums-service/albums.service';
import { ImageCardComponent } from '../../components/image-card/image-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AlbumsDataSharedService, FilteredPhoto } from '../../services/data-shared/albums/albums-data-shared.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, ImageCardComponent],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [AlbumsDataSharedService]
})
export class GalleryComponent implements OnInit {
  private _PHOTOS_QTY = 10;
  private _albums: Album[] = [];
  private _filteredPhotos: FilteredPhoto[] = [];

  private _currentAlbumIndex = 0;
  currentPhotoIndex = 0;

  constructor(
    private _albumsDataSharedService: AlbumsDataSharedService
  ) { }

  ngOnInit(): void {
    this._albumsDataSharedService.filteredPhotos$.subscribe(photos => this._filteredPhotos = this._albumsDataSharedService.filterPhotos(photos));
  }

  get currentPhoto(): FilteredPhoto {
    return this._filteredPhotos[this.currentPhotoIndex];
  }

  nextPhoto() {
    if (this.currentPhotoIndex < this._filteredPhotos.length - 1) {
      this.currentPhotoIndex++;
    } else if (this._currentAlbumIndex < this._albums.length - 1) {
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
}
