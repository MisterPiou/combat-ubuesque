import { Component,OnInit, OnDestroy } from '@angular/core';
import { Router }           from '@angular/router';

import {ServerService}  from './server.service';
import {UserService}    from '../User/user.service';

import {url_root} from '../data';

@Component({
  selector: 'waiting-room',
  templateUrl: './waiting-room.component.html',
})
export class WaitingRoomComponent implements OnInit, OnDestroy
{
    socket = io(url_root+':4000');
    listUserInfo: any[];
    
    constructor(
        private router: Router,
        private serverService: ServerService,
        private userService: UserService
    ) {}  
    
    ngOnInit() {
        this.socket.emit('add user', this.userService.userInfo);
        this.socket.on('login', function (data: any) {
            console.log("nombre d'utilisateur:" + data.numUsers);
            this.listUserInfo = data.listUsers;
        }.bind(this));
    }
    
    ngOnDestroy() {
        this.socket.emit('disconnect');
    }
}