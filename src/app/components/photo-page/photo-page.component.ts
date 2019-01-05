import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo-service/photo.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/interfaces/photo';
import { AlbumService } from 'src/app/services/album-service/album.service';

@Component({
  selector: 'app-photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.scss']
})
export class PhotoPageComponent implements OnInit {

  photo: Photo;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.photoService.getPhoto(id).subscribe(res => {
      this.photo = res;
      this.initAlbum();
    });
  }

  private initAlbum(): void {
    this.albumService.getAlbum(this.photo.albumId).subscribe(res => console.log(res));
  }
}
