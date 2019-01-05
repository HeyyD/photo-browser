import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoPageComponent } from './components/photo-page/photo-page.component';

const appRoutes: Routes = [
  { path: 'photos', component: PhotoListComponent },
  { path: 'photo/:id', component: PhotoPageComponent},
  { path: '**', redirectTo: '/photos', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    PhotoListComponent,
    PhotoPageComponent
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
