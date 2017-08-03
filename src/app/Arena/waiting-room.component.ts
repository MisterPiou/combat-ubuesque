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
    infoAsker: {} = { id: 0, pseudo: "", race: null, level: 0, socketId: "" };
    infoReceiver: {} = { id: 0, pseudo: "", race: null, level: 0, socketId: "" };
    listUsers: any[];
    interval = 0;
    messageWaiting = 'secondes';
    secondsWaiting = 11;
    
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
        this.socket.emit('add user', this.infoUser());

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
            this.infoAsker = data.infoUser;
            this.infoAsker.socketId = data.socketIdAsker;
        }.bind(this));
        this.socket.on('battle accepted', function() {
            console.log("Battle confirmed !");
            $('#battleWaitModal').modal('hide');
            this.router.navigate(['arena/battle/', this.infoReceiver.id,'/0']);
        }.bind(this));
        this.socket.on('battle refused', function() {
            console.log("Battle refused...");
            $('#battleWaitModal').modal('hide');
        }.bind(this));
        this.socket.on('battle canceled', function() {
            $('#battleAskModal').modal('hide');
            console.log("Battle canceled...");
        }.bind(this));
    }
    
    applicationBattle(infoReceiver: any) {
        this.infoReceiver = infoReceiver;
        this.waitingTimer();
        $('#battleWaitModal').modal('show');
        this.socket.emit('application battle', this.infoReceiver.socketId, this.infoUser());
    }
    
    acceptBattle(socketIdAsker:any) {
        this.socket.emit('accept battle',socketIdAsker);
        this.router.navigate(['arena/battle/', this.infoAsker.id,'/0']);
    }
    
    refuseBattle(socketIdAsker:any) {
        this.socket.emit('refuse battle',socketIdAsker);
    }
    
    cancelBattle(socketIdReceiver:any) {
        this.socket.emit('cancel battle',socketIdReceiver);
    }
    
    infoUser() {
        return {
            id: this.heroService.heroesInfo.id,
            pseudo: this.heroService.heroesInfo.name,
            race: this.heroService.heroesInfo.race.name,
            level: this.heroService.heroesInfo.level,
        };
    }
    
    private waitingTimer() {
        clearInterval(this.interval);
        this.interval = window.setInterval(() => {
            this.secondsWaiting -= 1;
            if (this.secondsWaiting === 0) {
                this.messageWaiting = 'Pas de reponse!';
                $('#battleWaitModal').modal('hide');
                this.cancelBattle(this.infoReceiver.socketId);
                clearInterval(this.interval);
            } else {
                if (this.secondsWaiting < 0) {this.secondsWaiting = 10; } // reset
                this.messageWaiting = `${this.secondsWaiting} secondes...`;
            }
        }, 1000);
    }
    
    ngOnDestroy() {
        this.socket.emit('disconnect');
    }
}