import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo-service/photo.service';
import { Photo } from 'src/app/interfaces/photo';
import Page from 'src/app/classes/Page';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent extends Page implements OnInit {

  photos: Photo[];

  photoLoadIndex = 90;
  photoLoadStep = 30;

  constructor(private photoService: PhotoService) {
    super();
   }

  ngOnInit(): void {
    this.addSubscription(
      this.photoService.getPhotos().subscribe(res => {
        this.photos = res;
      })
    );
  }

  onScroll(): void {
    this.photoLoadIndex += this.photoLoadStep;
  }
}
