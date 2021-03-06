"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var data_1 = require("../data");
var InfoServUser = (function () {
    function InfoServUser(id, pseudo, race, level, socketId) {
        this.id = id;
        this.pseudo = pseudo;
        this.race = race;
        this.level = level;
        this.socketId = socketId;
    }
    return InfoServUser;
}());
exports.InfoServUser = InfoServUser;
var ServerService = (function () {
    function ServerService() {
        this.socket = io(data_1.url_root + ':4000');
        this.infoAsker = new InfoServUser(0, "", null, 0, "");
        this.infoReceiver = new InfoServUser(0, "", null, 0, "");
    }
    ServerService.prototype.getSocket = function () {
        return this.socket;
    };
    ServerService.prototype.setInfoAsker = function (info) {
        this.infoAsker = info;
    };
    ServerService.prototype.getInfoAsker = function () {
        return this.infoAsker;
    };
    ServerService.prototype.setInfoReceiver = function (info) {
        this.infoReceiver = info;
    };
    ServerService.prototype.getInfoReceiver = function () {
        return this.infoReceiver;
    };
    ServerService.prototype.setInfos = function (infoAsker, infoReceiver) {
        this.infoAsker = infoAsker;
        this.infoReceiver = infoReceiver;
    };
    ServerService.prototype.getOpponentId = function () {
        if (this.infoAsker.id == 0)
            return this.infoReceiver.socketId;
        else
            return this.infoAsker.socketId;
    };
    return ServerService;
}());
ServerService = __decorate([
    core_1.Injectable()
], ServerService);
exports.ServerService = ServerService;
//# sourceMappingURL=server.service.js.map