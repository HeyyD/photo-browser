import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/services/album-service/album.service';
import { Album } from 'src/app/interfaces/album';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/interfaces/user';
import { Photo } from 'src/app/interfaces/photo';
import { PhotoService } from 'src/app/services/photo-service/photo.service';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.scss']
})
export class AlbumPageComponent implements OnInit, OnDestroy {

  album: Album;
  user: User;
  photos: Photo[];

  private subscribtions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private userService: UserService,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const sub = this.albumService.getAlbum(id).subscribe(res => {
      this.album = res;
      this.initUser();
      this.initPhotos();
    });
    this.subscribtions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach(sub => sub.unsubscribe());
  }

  isReady(): boolean {
    return !!(this.album && this.user && this.photos);
  }

  private initUser(): void {
    const sub = this.userService.getUser(this.album.userId).subscribe(res => {
      this.user = res;
    });
    this.subscribtions.push(sub);
  }

  private initPhotos(): void {
    const sub = this.photoService.getAlbumPhotos(this.album.id).subscribe(res => {
      this.photos = res;
    });
    this.subscribtions.push(sub);
  }

}
