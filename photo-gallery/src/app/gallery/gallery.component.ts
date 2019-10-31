import { Component, OnInit } from '@angular/core';
import { Photo } from './Photo';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit {

  photos: Photo[] = [];
  photosView: any = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3001/gallery').subscribe((result: any) => {
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
      
      console.log(this.photosView);
    });
  }
}
