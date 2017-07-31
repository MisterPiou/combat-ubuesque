import { Component,OnInit } from '@angular/core';
import { Router }           from '@angular/router';

import {ServerService} from './server.service';

@Component({
  selector: 'waiting-room',
  templateUrl: './waiting-room.component.html',
})
export class WaitingRoomComponent implements OnInit
{
    socket = io('http://localhost:4000');
     
    
    constructor(
        private router: Router,
        private serverService: ServerService
    ) {}  
    
    ngOnInit() {
        this.socket.emit('add user', "piou");
        this.socket.on('login', function (data: any) {
            console.log("nombre d'utilisateur:" + data.numUsers);
        }.bind(this));
    }
}