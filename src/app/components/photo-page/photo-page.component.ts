import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo-service/photo.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/interfaces/photo';
import { AlbumService } from 'src/app/services/album-service/album.service';
import { Album } from 'src/app/interfaces/album';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.scss']
})
export class PhotoPageComponent implements OnInit {

  photo: Photo;
  album: Album;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private albumService: AlbumService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.photoService.getPhoto(id).subscribe(res => {
      this.photo = res;
      this.initAlbum();
    });
  }

  isReady(): boolean {
    return !!(this.photo && this.album && this.user);
  }

  private initAlbum(): void {
    this.albumService.getAlbum(this.photo.albumId).subscribe(res => {
      this.album = res;
      console.log('album', this.album);
      this.initUser();
    });
  }

  private initUser(): void {
    this.userService.getUser(this.album.userId).subscribe(res => {
      this.user = res;
      console.log('user', this.user);
    });
  }
}
