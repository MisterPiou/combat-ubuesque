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
//import * as io from 'socket.io-client';
var WaitingRoomComponent = (function () {
    function WaitingRoomComponent(router, serverService) {
        this.router = router;
        this.serverService = serverService;
        this.socket = io('http://localhost:4000');
    }
    WaitingRoomComponent.prototype.ngOnInit = function () {
        this.socket.emit('add user', "piou");
        this.socket.on('login', function (data) {
            console.log("nombre d'utilisateur:" + data.numUsers);
        }.bind(this));
    };
    return WaitingRoomComponent;
}());
WaitingRoomComponent = __decorate([
    core_1.Component({
        selector: 'waiting-room',
        templateUrl: './waiting-room.component.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        server_service_1.ServerService])
], WaitingRoomComponent);
exports.WaitingRoomComponent = WaitingRoomComponent;
//# sourceMappingURL=waiting-room.component.js.map