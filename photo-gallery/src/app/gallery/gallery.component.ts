import { Component, OnInit } from '@angular/core';
import { Photo } from './Photo';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthCookie } from '../auth-cookies-handler';
import { WebSocketService } from '../web-soket';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit {

  photos: Photo[] = [];
  photosView: any = [];

  findText = '';
  lastFindText = '';
  waitTimes = 0;
  message = '';
  constructor(private router: Router, private httpClient: HttpClient, private _authCookie: AuthCookie, private webSocketService: WebSocketService) { }

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    this.webSocketService.webSocketContext.onmessage = (result: any) => {
      if (result && result.data) {
        if (result.data.photos) {
          this.photos = JSON.parse(result.data.photos);
        } else {
          this.message = result.data.message;
        }
      } else {
        this.router.navigate(['/']);
      }
    };
    this.httpClient.post('http://localhost:3001/gallery', `data=${JSON.stringify({token: this._authCookie.getAuth(), pageName: "gallery"})}`, this.options).subscribe((result: any) => {
      if (result) {
        this.photos = result;
        let categories = [];
        this.photos.forEach(photo => {
          if (categories.includes(photo.categoryName)) return;
          categories.push(photo.categoryName);
        });
        categories.forEach(category => {
          this.photosView.push({
            name:category,
            array:[]
          });
          this.photosView[this.photosView.length-1].array[0] = [];
          let photosByCategory = this.photos.filter(x => x.categoryName == category);
          for (let i = 0, j = 0; i * 3 + j < photosByCategory.length; j++) {
            if (j > 2) {
              j = 0;
              i++;
              this.photosView[this.photosView.length-1].array[i] = [];
            }
            this.photosView[this.photosView.length-1].array[i][j] = photosByCategory[i * 3 + j];
          }
        });
      }
      else {
        this.router.navigate(["/"]);
      }
    });
    setInterval(() => {
      if (this.waitTimes !== 0) {
        this.waitTimes--;
      } else {
        if (this.lastFindText !== this.findText) {
          this.lastFindText = this.findText;
          this.waitTimes = 10;
          this.httpClient.post('http://localhost:3001/gallery', `data=${JSON.stringify({token: this._authCookie.getAuth(), data: { findText: this.findText }})}`, this.options).subscribe((result: any) => {
            if (result) {
              this.photos = result;
              let authors = [];
              this.photos.forEach(photo => {
                if (authors.includes(photo.categoryName)) return;
                authors.push(photo.categoryName);
              });
              this.photosView = [];
              authors.forEach(category => {
                this.photosView.push({
                  name:category,
                  array:[]
                });
                this.photosView[this.photosView.length-1].array[0] = [];
                let photosByCategory = this.photos.filter(x => x.categoryName == category);
                for (let i = 0, j = 0; i * 3 + j < photosByCategory.length; j++) {
                  if (j > 2) {
                    j = 0;
                    i++;
                    this.photosView[this.photosView.length-1].array[i] = [];
                  }
                  this.photosView[this.photosView.length-1].array[i][j] = photosByCategory[i * 3 + j];
                }
              });
            }
            else {
              this.router.navigate(["/"]);
            }
          });
        }
      }
    }, 100);
  }
}