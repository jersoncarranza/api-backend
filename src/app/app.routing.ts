import {ModuleWithProviders} from '@angular/core';
import{Routes, RouterModule} from '@angular/router';
//Components
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import{UsersComponent} from './components/users/users.component'
import { TimelineComponent } from './components/timeline/timeline.component';
import {ProfileComponent} from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import {FollowedComponent} from './components/followed/followed.component';
import {CodigoComponent} from './components/codigo/codigo.component';

/**Admin */
import {ListacodigoComponent} from './components/admin/codigo/listacodigo/listacodigo.component';
import {UserGuard} from './services/guard/user.guard';
import { DenegadoComponent } from './components/admin/permiso/denegado/denegado.component';
const appRoutes: Routes = [
    {path:'', component: HomeComponent, canActivate:[UserGuard]},
    {path:'home', component: HomeComponent, canActivate:[UserGuard]},
    {path: 'mis-datos', component: UserEditComponent, canActivate:[UserGuard]},
    {path: 'gente', component: UsersComponent,canActivate:[UserGuard]},
    {path: 'gente/:page', component: UsersComponent, canActivate:[UserGuard]},
    {path: 'timeline', component: TimelineComponent, canActivate:[UserGuard]},
    {path: 'perfil/:id', component: ProfileComponent, canActivate:[UserGuard]},
    {path: 'siguiendo/:id/:page', component: FollowingComponent, canActivate:[UserGuard]},
    {path: 'seguidores/:id/:page', component: FollowedComponent, canActivate:[UserGuard]},
   
    {path:'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent} ,
    {path:'codigo', component: CodigoComponent},
    //admin
    {path:'admin', component:ListacodigoComponent, canActivate:[UserGuard]},
    {path:'admin/:page', component:ListacodigoComponent, canActivate:[UserGuard]},

    //Pagina de permisos
    {path:'denegado', component:DenegadoComponent}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders= RouterModule.forRoot(appRoutes);