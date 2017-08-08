"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var data_1 = require("../data");
var ServerService = (function () {
    function ServerService() {
        this.socket = io(data_1.url_root + ':4000');
        this.infoAsker = { id: 0, pseudo: "", race: null, level: 0, socketId: "" };
        this.infoReceiver = { id: 0, pseudo: "", race: null, level: 0, socketId: "" };
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
    return ServerService;
}());
ServerService = __decorate([
    core_1.Injectable()
], ServerService);
exports.ServerService = ServerService;
//# sourceMappingURL=server.service.js.map