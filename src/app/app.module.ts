import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { BarComponent } from './bar/bar.component';
import { AppRoutingModule } from './app-routing.module';
import { BooksComponent } from './books/books.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { AdministracijaComponent } from './administracija/administracija.component';
import { ProfilComponent } from './profil/profil.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    LoginComponent,
    MenuComponent,
    BarComponent,
    BooksComponent,
    SearchFilterPipe,
    AdministracijaComponent,
    ProfilComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [BarComponent]
})
export class AppModule { }
