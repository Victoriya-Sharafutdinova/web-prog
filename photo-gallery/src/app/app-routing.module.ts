import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router'; 
import {NotFoundComponent} from './not-found/not-found.component';
import {StartPageComponent} from './start-page/start-page.component';
import {AuthorComponent} from './author/author.component';
import {AlbumComponent} from './album/album.component';
import {AdminComponent} from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { RegComponent } from './reg/reg.component';



const routes: Routes = [
    {path:'admin', component:AdminComponent},
    {path:'auth', component:AuthComponent},
    {path:'home', component:StartPageComponent},
    {path:'gallery', loadChildren: './gallery/gallery.module#GalleryModule'},
    {path:'author', component:AuthorComponent},
    {path:'album', component:AlbumComponent},
    {path:'reg', component:RegComponent},
    {path:'', redirectTo:'/home',  pathMatch:'full'},
    {path:'**', component:NotFoundComponent}
]; 

@NgModule({ 
imports: [RouterModule.forRoot(routes)], 
exports: [RouterModule] 
}) 
export class AppRoutingModule { }