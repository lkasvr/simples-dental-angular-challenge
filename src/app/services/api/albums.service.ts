import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Album {
  userId: number;
  id: number;
  title: string;
};

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private albumsEndpoint = 'https://jsonplaceholder.typicode.com/albums';
  private photosEndpoint = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) { }

  getAlbums() {
    return this.http.get<Album[]>(this.albumsEndpoint);
  }

  getPhotos() {
    return this.http.get<Photo[]>(this.photosEndpoint);
  }
}
