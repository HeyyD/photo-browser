import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoLinkComponent } from './photo-link.component';

describe('PhotoLinkComponent', () => {
  let component: PhotoLinkComponent;
  let fixture: ComponentFixture<PhotoLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
