import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhotoService } from 'src/app/services/photo-service/photo.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Photo } from 'src/app/interfaces/photo';
import { AlbumService } from 'src/app/services/album-service/album.service';
import { Album } from 'src/app/interfaces/album';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs';
import Page from 'src/app/classes/Page';

@Component({
  selector: 'app-photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.scss']
})
export class PhotoPageComponent extends Page {

  photo: Photo;
  album: Album;
  user: User;
  albumPhotos: Photo[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private albumService: AlbumService,
    private userService: UserService
  ) {
    super();

    this.addSubscription(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.reset();
        }
      })
    );
  }

  isReady(): boolean {
    return !!(this.photo && this.album && this.user && this.albumPhotos);
  }

  private init() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.addSubscription(
      this.photoService.getPhoto(id).subscribe(res => {
        this.photo = res;
        this.initAlbumPhotos();
        this.initAlbum();
      })
    );
  }

  private initAlbum(): void {
    this.addSubscription(
      this.albumService.getAlbum(this.photo.albumId).subscribe(res => {
        this.album = res;
        this.initUser();
      })
    );
  }

  private initUser(): void {
    this.addSubscription(
      this.userService.getUser(this.album.userId).subscribe(res => {
        this.user = res;
      })
    );
  }

  private initAlbumPhotos(): void {
    this.addSubscription(
      this.photoService.getAlbumPhotos(this.photo.albumId).subscribe(res => {
        this.albumPhotos = res;
      })
    );
  }

  private reset(): void {
    this.photo = undefined;
    this.user = undefined;
    this.album = undefined;
    this.albumPhotos = undefined;
    this.init();
  }
}
