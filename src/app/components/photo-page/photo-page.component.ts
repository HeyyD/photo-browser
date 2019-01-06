import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhotoService } from 'src/app/services/photo-service/photo.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Photo } from 'src/app/interfaces/photo';
import { AlbumService } from 'src/app/services/album-service/album.service';
import { Album } from 'src/app/interfaces/album';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.scss']
})
export class PhotoPageComponent implements OnDestroy {

  photo: Photo;
  album: Album;
  user: User;
  albumPhotos: Photo[];

  subscriptios: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private albumService: AlbumService,
    private userService: UserService
  ) {
    const sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.init();
      }
    });

    this.subscriptios.push(sub);
  }

  ngOnDestroy() {
    this.subscriptios.forEach(subscription => subscription.unsubscribe());
  }

  isReady(): boolean {
    return !!(this.photo && this.album && this.user && this.albumPhotos);
  }

  private init() {
    const id = +this.route.snapshot.paramMap.get('id');
    const sub = this.photoService.getPhoto(id).subscribe(res => {
      this.photo = res;
      this.initAlbumPhotos();
      this.initAlbum();
    });

    this.subscriptios.push(sub);
  }

  private initAlbum(): void {
    const sub = this.albumService.getAlbum(this.photo.albumId).subscribe(res => {
      this.album = res;
      this.initUser();
    });

    this.subscriptios.push(sub);
  }

  private initUser(): void {
    const sub = this.userService.getUser(this.album.userId).subscribe(res => {
      this.user = res;
    });

    this.subscriptios.push(sub);
  }

  private initAlbumPhotos(): void {
    const sub = this.photoService.getAlbumPhotos(this.photo.albumId).subscribe(res => {
      this.albumPhotos = res;
    });

    this.subscriptios.push(sub);
  }
}
