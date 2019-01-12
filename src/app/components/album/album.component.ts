import { Component, OnInit, Input } from '@angular/core';
import { Album } from 'src/app/interfaces/album';
import { Photo } from 'src/app/interfaces/photo';
import { PhotoService } from 'src/app/services/photo-service/photo.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  @Input() album: Album;

  photos: Photo[];

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.getAlbumPhotos(this.album.id).subscribe(res => this.photos = res.slice(0, 5));
  }

}
