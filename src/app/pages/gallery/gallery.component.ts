import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  private _filteredPhotos: FilteredPhoto[] = [];

  private fromPhoto = 0;
  private toPhoto = this._PHOTOS_QTY;
  currentPhotoNumber = 1;

  constructor(
    private _albumsDataSharedService: AlbumsDataSharedService
  ) { }

  ngOnInit(): void {
    this._albumsDataSharedService.filteredPhotos$.subscribe(photos => this._filteredPhotos = this._albumsDataSharedService.filterPhotos(photos));
  }

  get filteredPhotos(): FilteredPhoto[] {
    return this._filteredPhotos.slice(this.fromPhoto, this.toPhoto);
  }

  nextPhoto() {
    if (this.toPhoto < this._filteredPhotos.length - 1) {
      this.fromPhoto += this._PHOTOS_QTY + 1;
      this.toPhoto += this._PHOTOS_QTY + 1;
    } else {
      this.fromPhoto = 0;
      this.toPhoto = this._PHOTOS_QTY;
    }
  }

  prevPhoto() {
    if (this.fromPhoto === 0) {
      this.toPhoto = this._filteredPhotos.length - 1;
      this.fromPhoto = (this._filteredPhotos.length - 1) - this._PHOTOS_QTY;
    } else {
      this.fromPhoto -= this._PHOTOS_QTY + 1;
      this.toPhoto -= this._PHOTOS_QTY + 1;
    }

    if (this.fromPhoto < 0) this.fromPhoto = 0;
  }

}
