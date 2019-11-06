//Modulos
import{NgModule} from '@angular/core';
import{CommonModule} from '@angular/common';
import{FormsModule} from '@angular/forms';
import{MomentModule} from 'angular2-moment';
//rutas
import {MessagesRoutingModule} from './messages-routing-module';
//Components
import {MainComponent} from '../../components/messages/main/main.component';
import{AddComponent} from '../../components/messages/add/add.component';
import{ReceivedComponent} from '../../components/messages/received/received.component';
import{SendedComponent} from '../../components/messages/sended/sended.component';
//
import {UserService} from '../../services/user.service';
import {UserGuard} from '../../services/guard/user.guard';

@NgModule({
    declarations:[
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        MessagesRoutingModule,
        MomentModule
    ],
    exports:[
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ],
    providers:[
        UserService,
        UserGuard
    ],
    
    //bootstrap: [AppComponent]
})  

export class MessagesModule { }