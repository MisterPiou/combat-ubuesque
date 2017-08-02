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
var data_1 = require("../data");
var WaitingRoomComponent = (function () {
    function WaitingRoomComponent(router, serverService, userService, heroService, errorService) {
        this.router = router;
        this.serverService = serverService;
        this.userService = userService;
        this.heroService = heroService;
        this.errorService = errorService;
        this.socket = io(data_1.url_root + ':4000');
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
        this.socket.emit('add user', {
            id: this.heroService.heroesInfo.id,
            pseudo: this.heroService.heroesInfo.name,
            race: this.heroService.heroesInfo.race.name,
            level: this.heroService.heroesInfo.level,
        });
        /** list user **/
        this.socket.on('login', function (data) {
            console.log("You're a log with " + data.numUsers + " users");
            this.listUsers = data.listUsers;
        }.bind(this));
        this.socket.on('user joined', function (data) {
            console.log("User joined room ! You're with " + data.numUsers + " users");
            this.listUsers = data.listUsers;
        }.bind(this));
        this.socket.on('user left', function (data) {
            console.log("A user left room ! You're with " + data.numUsers + " users");
            this.listUsers = data.listUsers;
        }.bind(this));
        /** Battle application **/
        this.socket.on('battle or not', function (data) {
            $('#battleAskModal').modal('show');
            this.socketIdAsker = data.socketIdAsker;
        }.bind(this));
        this.socket.on('battle accepted', function () {
            console.log("Battle confirmed !");
        }.bind(this));
        this.socket.on('battle refused', function () {
            console.log("Battle refused...");
        }.bind(this));
    };
    WaitingRoomComponent.prototype.applicationBattle = function (socketIdReceiver) {
        this.socket.emit('application battle', socketIdReceiver);
    };
    WaitingRoomComponent.prototype.acceptBattle = function (socketIdAsker) {
        this.socket.emit('accept battle', socketIdAsker);
    };
    WaitingRoomComponent.prototype.refuseBattle = function (socketIdAsker) {
        this.socket.emit('refuse battle', socketIdAsker);
    };
    WaitingRoomComponent.prototype.ngOnDestroy = function () {
        this.socket.emit('disconnect');
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