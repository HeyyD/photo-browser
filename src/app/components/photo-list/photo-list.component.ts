import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo-service/photo.service';
import { Photo } from 'src/app/interfaces/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[];

  photoLoadIndex = 90;
  photoLoadStep = 30;

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe(res => {
      this.photos = res;
    });
  }

  onScroll(): void {
    this.photoLoadIndex += this.photoLoadStep;
  }
}
