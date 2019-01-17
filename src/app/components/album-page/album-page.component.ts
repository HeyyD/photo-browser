import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AlbumService } from 'src/app/services/album-service/album.service';
import { Album } from 'src/app/interfaces/album';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/interfaces/user';
import { Photo } from 'src/app/interfaces/photo';
import { PhotoService } from 'src/app/services/photo-service/photo.service';
import Page from 'src/app/classes/Page';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.scss']
})
export class AlbumPageComponent extends Page {

  album: Album;
  user: User;
  photos: Photo[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService,
    private userService: UserService,
    private photoService: PhotoService
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

  init(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.addSubscription(
      this.albumService.getAlbum(id).subscribe(res => {
        this.album = res;
        this.initUser();
        this.initPhotos();
      })
    );
  }

  isReady(): boolean {
    return !!(this.album && this.user && this.photos);
  }

  private initUser(): void {
    this.addSubscription(
      this.userService.getUser(this.album.userId).subscribe(res => {
        this.user = res;
      })
    );
  }

  private initPhotos(): void {
    this.addSubscription(
      this.photoService.getAlbumPhotos(this.album.id).subscribe(res => {
        this.photos = res;
      })
    );
  }

  private reset(): void {
    this.album = undefined;
    this.photos = undefined;
    this.user = undefined;
    this.init();
  }

}
