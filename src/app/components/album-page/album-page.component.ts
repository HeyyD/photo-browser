import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class AlbumPageComponent extends Page implements OnInit {

  album: Album;
  user: User;
  photos: Photo[];

  private subscribtions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private userService: UserService,
    private photoService: PhotoService
  ) {
    super();
  }

  ngOnInit(): void {
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

}
