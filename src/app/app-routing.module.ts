import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracijaComponent } from './administracija/administracija.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'user/:username', component: LoginComponent },
  { path: 'knjige', component: BooksComponent },
  { path: 'administracija', component: AdministracijaComponent },
  { path: 'profil', component: ProfilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }