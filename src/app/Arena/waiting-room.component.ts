import { Component,OnInit, OnDestroy } from '@angular/core';
import { Router }           from '@angular/router';

import {ServerService}  from './server.service';
import {UserService}    from '../User/user.service';
import {HeroService}    from '../Hero/hero.service';
import {ErrorService}    from '../Global/error.service';

import {url_root} from '../data';

@Component({
  selector: 'waiting-room',
  templateUrl: './waiting-room.component.html',
})
export class WaitingRoomComponent implements OnInit, OnDestroy
{
    socket = io(url_root+':4000');
    socketIdAsker: any;
    listUsers: any[];
    
    constructor(
        private router: Router,
        private serverService: ServerService,
        private userService: UserService,
        private heroService: HeroService,
        private errorService: ErrorService,
    ) {}  
    
    ngOnInit() {
        if(this.heroService.heroesInfo) {
            this.initSocket();
        }
        else {
            this.heroService.getHeroSelected().subscribe(
                hero => {
                    this.heroService.heroesInfo = hero;
                    this.initSocket();
                },
                error => this.errorService.newErrorMessage(error)
            )
        }
    }
    
    initSocket() {
        this.socket.emit('add user', {
            id: this.heroService.heroesInfo.id,
            pseudo: this.heroService.heroesInfo.name,
            race: this.heroService.heroesInfo.race.name,
            level: this.heroService.heroesInfo.level,
        });

        /** list user **/
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

        /** Battle application **/
        this.socket.on('battle or not', function(data: any) {
            $('#battleAskModal').modal('show');
            this.socketIdAsker = data.socketIdAsker;
        }.bind(this));
        this.socket.on('battle accepted', function() {
            console.log("Battle confirmed !");
        }.bind(this));
        this.socket.on('battle refused', function() {
            console.log("Battle refused...");
        }.bind(this));
    }
    
    applicationBattle(socketIdReceiver:any) {
        this.socket.emit('application battle',socketIdReceiver);
    }
    
    acceptBattle(socketIdAsker:any) {
        this.socket.emit('accept battle',socketIdAsker);
    }
    
    refuseBattle(socketIdAsker:any) {
        this.socket.emit('refuse battle',socketIdAsker);
    }
    
    ngOnDestroy() {
        this.socket.emit('disconnect');
    }
}