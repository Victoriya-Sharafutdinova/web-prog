import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Photo } from '../gallery/Photo';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  photos: Photo[] = [];

  isUpdate: boolean = false;
  photo: Photo = new Photo();

  constructor(private httpClient: HttpClient) { }
  way = "localhost:3001";
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    this.httpClient.get(`http://${this.way}/gallery`).subscribe((result: any) => this.photos = result);
  }

  buttonCreateUpdateClick() {
    if (this.isUpdate) {
      this.Update();
    }
    else {
      this.Create();
    }
  }

  Create(){
    this.httpClient.post(`http://${this.way}/gallery/create`, this.photo, this.options).subscribe((result: any) => {
      if (!result) return;
      this.photos.push({id: result.id, URL: result.URL, categoryName: result.categoryName, author: result.author});
    });
  }

  buttonLoadUpdateClick(id: string) {
    this.photo = JSON.parse(JSON.stringify(this.photos.find(x => x.id == parseInt(id))));
    this.isUpdate = true;
  }

  Update() {
    this.httpClient.post(`http://${this.way}/gallery/update`, this.photo, this.options).subscribe((result: any) => {
      if (!result) return;
      let photosIndex = this.photos.findIndex(x => x.id == result.id);
      if (photosIndex == -1) return;
      this.photos[photosIndex] = result;
      this.photo = new Photo();
    });
    this.isUpdate = false;
  }
  
  buttonDeleteClick(id: number) {
    this.httpClient.post(`http://${this.way}/gallery/delete`, {
      id: id
    }, this.options).subscribe((result: any) => {
      if (result) {
        let photosIndex = this.photos.findIndex(x => x.id == id);
        if (photosIndex == -1) return;
        this.photos.splice(photosIndex, 1);
      }
    });
  }
}
