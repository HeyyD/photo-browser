import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoPageComponent } from './components/photo-page/photo-page.component';
import { PhotoLinkComponent } from './components/photo-link/photo-link.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AlbumComponent } from './components/album/album.component';

const appRoutes: Routes = [
  { path: 'home', component: PhotoListComponent },
  { path: 'photo/:id', component: PhotoPageComponent},
  { path: 'user/:id', component: UserPageComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    PhotoListComponent,
    PhotoPageComponent,
    PhotoLinkComponent,
    ToolbarComponent,
    SpinnerComponent,
    UserPageComponent,
    AlbumComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
