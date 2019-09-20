import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router'; 
import {NotFoundComponent} from './not-found/not-found.component';
import {StartPageComponent} from './start-page/start-page.component';
import {GalleryComponent} from './gallery/gallery.component';
import {AuthorComponent} from './author/author.component';
import {AlbumComponent} from './album/album.component';



const routes: Routes = [
    {path:'home', component:StartPageComponent},
    {path:'gallery', component:GalleryComponent},
    {path:'author', component:AuthorComponent},
    {path:'album', component:AlbumComponent},
    {path:'', redirectTo:'/home',  pathMatch:'full'},
    {path:'**', component:NotFoundComponent}
]; 

@NgModule({ 
imports: [RouterModule.forRoot(routes)], 
exports: [RouterModule] 
}) 
export class AppRoutingModule { }