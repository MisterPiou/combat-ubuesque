import { Component,OnInit, OnDestroy } from '@angular/core';
import { Router }           from '@angular/router';

import {ServerService}  from './server.service';
import {UserService}    from '../User/user.service';
import {HeroService}    from '../Hero/hero.service';

import {url_root} from '../data';

@Component({
  selector: 'waiting-room',
  templateUrl: './waiting-room.component.html',
})
export class WaitingRoomComponent implements OnInit, OnDestroy
{
    socket = io(url_root+':4000');
    listUsers: any[];
    
    constructor(
        private router: Router,
        private serverService: ServerService,
        private userService: UserService,
        private heroService: HeroService,
    ) {}  
    
    ngOnInit() {
        if(this.heroService.heroesInfo) {
            this.socket.emit('add user', {
                id: this.heroService.heroesInfo.id,
                pseudo: this.heroService.heroesInfo.name,
                race: this.heroService.heroesInfo.race.name,
                level: this.heroService.heroesInfo.level,
            });
            
            this.socket.on('login', function (data: any) {
                console.log("You're a log with " + data.numUsers + " users")
                this.listUsers = data.listUsers;
            }.bind(this));
            
            this.socket.on('user joined', function (data: any) {
                console.log("User joined room ! You're with " + data.numUsers + " users")
                this.listUsers = data.listUsers;
            }.bind(this));
            
            this.socket.on('user left', function (data: any) {
                console.log("A user left room ! You're with " + data.numUsers + " users")
                this.listUsers = data.listUsers;
            }.bind(this));
        }
    }
    
    ngOnDestroy() {
        this.socket.emit('disconnect');
    }
}