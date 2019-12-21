import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing, appRoutingProviders} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MomentModule} from 'angular2-moment';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';
//Servicios
import {UserService} from './services/user.service';
import {UserGuard} from './services/guard/user.guard';

import {MessagesModule} from './messages/components/messages.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { CodigoComponent } from './components/codigo/codigo.component';
import { ListacodigoComponent } from './components/admin/codigo/listacodigo/listacodigo.component';
import { ModalComponent } from './components/admin/codigo/modal/modal.component';
import { PopupComponent } from './components/admin/codigo/popup/popup.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DenegadoComponent } from './components/admin/permiso/denegado/denegado.component';
import { MatchComponent } from './components/usuario/match/match.component';
import { PopupmensajeComponent } from './components/usuario/popupmensaje/popupmensaje.component';

@NgModule({
  declarations: [  AppComponent, LoginComponent, RegisterComponent, HomeComponent,
      			UserEditComponent, UsersComponent, SidebarComponent, TimelineComponent,
    			ProfileComponent, PublicationsComponent, FollowingComponent, FollowedComponent,
    			CodigoComponent, ListacodigoComponent, ModalComponent,  PopupComponent, DenegadoComponent, MatchComponent, PopupmensajeComponent,
    // AddComponent,
    // MainComponent,
    // ReceivedComponent,
    // SendedComponent
  ],
  imports: [ BrowserModule, FormsModule, HttpClientModule,   routing,
    		MomentModule, MessagesModule,  ReactiveFormsModule, ModalModule.forRoot()
  ],
  providers: [ appRoutingProviders, UserService, UserGuard
  ],
  entryComponents: [ PopupComponent, PopupmensajeComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
