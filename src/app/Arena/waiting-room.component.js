"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var server_service_1 = require("./server.service");
var user_service_1 = require("../User/user.service");
var hero_service_1 = require("../Hero/hero.service");
var error_service_1 = require("../Global/error.service");
var InfoUser = (function () {
    function InfoUser(id, pseudo, race, level, socketId) {
        this.id = id;
        this.pseudo = pseudo;
        this.race = race;
        this.level = level;
        this.socketId = socketId;
    }
    return InfoUser;
}());
exports.InfoUser = InfoUser;
var WaitingRoomComponent = (function () {
    function WaitingRoomComponent(router, serverService, userService, heroService, errorService) {
        this.router = router;
        this.serverService = serverService;
        this.userService = userService;
        this.heroService = heroService;
        this.errorService = errorService;
        this.infoAsker = new InfoUser(0, "", null, 0, "");
        this.infoReceiver = new InfoUser(0, "", null, 0, "");
        this.interval = 0;
        this.messageWaiting = 'secondes';
        this.secondsWaiting = 11;
    }
    WaitingRoomComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.heroService.heroesInfo) {
            this.initSocket();
        }
        else {
            this.heroService.getHeroSelected().subscribe(function (hero) {
                _this.heroService.heroesInfo = hero;
                _this.initSocket();
            }, function (error) { return _this.errorService.newErrorMessage(error); });
        }
    };
    WaitingRoomComponent.prototype.initSocket = function () {
        this.serverService.getSocket().emit('add user', this.infoUser());
        /** list user **/
        this.serverService.getSocket().on('login', function (data) {
            console.log("You're a log with " + data.numUsers + " users");
            this.listUsers = data.listUsers;
        }.bind(this));
        this.serverService.getSocket().on('user joined', function (data) {
            console.log("User joined room ! You're with " + data.numUsers + " users");
            this.listUsers = data.listUsers;
        }.bind(this));
        this.serverService.getSocket().on('user left', function (data) {
            console.log("A user left room ! You're with " + data.numUsers + " users");
            this.listUsers = data.listUsers;
        }.bind(this));
        /** Battle application **/
        this.serverService.getSocket().on('battle or not', function (data) {
            $('#battleAskModal').modal('show');
            this.infoAsker = data.infoUser;
            this.infoAsker.socketId = data.socketIdAsker;
        }.bind(this));
        this.serverService.getSocket().on('battle accepted', function () {
            console.log("Battle confirmed !");
            $('#battleWaitModal').modal('hide');
            this.serverService.setInfos(this.infoAsker, this.infoReceiver);
            this.router.navigate(['arena/battle/', this.infoReceiver.id, '/0']);
        }.bind(this));
        this.serverService.getSocket().on('battle refused', function () {
            console.log("Battle refused...");
            $('#battleWaitModal').modal('hide');
        }.bind(this));
        this.serverService.getSocket().on('battle canceled', function () {
            $('#battleAskModal').modal('hide');
            console.log("Battle canceled...");
        }.bind(this));
    };
    WaitingRoomComponent.prototype.applicationBattle = function (infoReceiver) {
        this.infoReceiver = infoReceiver;
        this.waitingTimer();
        $('#battleWaitModal').modal('show');
        this.serverService.getSocket().emit('application battle', this.infoReceiver.socketId, this.infoUser());
    };
    WaitingRoomComponent.prototype.acceptBattle = function (socketIdAsker) {
        this.serverService.getSocket().emit('accept battle', socketIdAsker);
        this.serverService.setInfos(this.infoAsker, this.infoReceiver);
        this.router.navigate(['arena/battle/', this.infoAsker.id, '/0']);
    };
    WaitingRoomComponent.prototype.refuseBattle = function (socketIdAsker) {
        this.serverService.getSocket().emit('refuse battle', socketIdAsker);
    };
    WaitingRoomComponent.prototype.cancelBattle = function (socketIdReceiver) {
        this.serverService.getSocket().emit('cancel battle', socketIdReceiver);
    };
    WaitingRoomComponent.prototype.infoUser = function () {
        return {
            id: this.heroService.heroesInfo.id,
            pseudo: this.heroService.heroesInfo.name,
            race: this.heroService.heroesInfo.race.name,
            level: this.heroService.heroesInfo.level,
        };
    };
    WaitingRoomComponent.prototype.waitingTimer = function () {
        var _this = this;
        clearInterval(this.interval);
        this.interval = window.setInterval(function () {
            _this.secondsWaiting -= 1;
            if (_this.secondsWaiting === 0) {
                _this.messageWaiting = 'Pas de reponse!';
                $('#battleWaitModal').modal('hide');
                _this.cancelBattle(_this.infoReceiver.socketId);
                clearInterval(_this.interval);
            }
            else {
                if (_this.secondsWaiting < 0) {
                    _this.secondsWaiting = 10;
                } // reset
                _this.messageWaiting = _this.secondsWaiting + " secondes...";
            }
        }, 1000);
    };
    WaitingRoomComponent.prototype.ngOnDestroy = function () {
        this.serverService.getSocket().emit('disconnect');
    };
    return WaitingRoomComponent;
}());
WaitingRoomComponent = __decorate([
    core_1.Component({
        selector: 'waiting-room',
        templateUrl: './waiting-room.component.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        server_service_1.ServerService,
        user_service_1.UserService,
        hero_service_1.HeroService,
        error_service_1.ErrorService])
], WaitingRoomComponent);
exports.WaitingRoomComponent = WaitingRoomComponent;
//# sourceMappingURL=waiting-room.component.js.map