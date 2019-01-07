import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from 'src/app/interfaces/photo';
import { Observable } from 'rxjs';
import { map, tap, filter, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  getAlbumPhotos(id: number): Observable<Photo[]> {
    return this.http.get<Photo[]>('https://jsonplaceholder.typicode.com/photos')
      .pipe(
        map(photos => {
          return photos.filter(photo => photo.albumId === id);
        })
      );
  }

  getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(`https://jsonplaceholder.typicode.com/photos/${id}`);
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>('https://jsonplaceholder.typicode.com/photos');
  }
}
