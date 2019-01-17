import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { AlbumService } from 'src/app/services/album-service/album.service';
import { Album } from 'src/app/interfaces/album';
import Page from 'src/app/classes/Page';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent extends Page implements OnInit {

  user: User;
  albums: Album[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private albumService: AlbumService
  ) {
    super();
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.addSubscriptions([
        this.userService.getUser(id).subscribe(res => this.user = res),
        this.albumService.getUserAlbums(id).subscribe(res => this.albums = res)
      ]
    );
  }

  isReady(): boolean {
    return !!(this.user && this.albums);
  }

}
