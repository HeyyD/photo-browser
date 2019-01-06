import { Component, Input } from '@angular/core';
import { Photo } from 'src/app/interfaces/photo';

@Component({
  selector: 'app-photo-link',
  templateUrl: './photo-link.component.html',
  styleUrls: ['./photo-link.component.scss']
})
export class PhotoLinkComponent {

  @Input() photo: Photo;

  constructor() { }

}
