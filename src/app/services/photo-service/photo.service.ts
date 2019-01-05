import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  getPhotos(): void {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(res => console.log(res));
  }

}
