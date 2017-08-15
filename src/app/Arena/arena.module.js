"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var arena_component_1 = require("./arena.component");
var arena_home_component_1 = require("./arena-home.component");
var training_component_1 = require("./training.component");
var battle_component_1 = require("./battle.component");
var waiting_room_component_1 = require("./waiting-room.component");
var server_service_1 = require("./server.service");
var arena_routing_module_1 = require("./arena-routing.module");
var ArenaModule = (function () {
    function ArenaModule() {
    }
    return ArenaModule;
}());
ArenaModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            arena_routing_module_1.ArenaRoutingModule
        ],
        declarations: [
            arena_component_1.ArenaComponent,
            arena_home_component_1.ArenaHomeComponent,
            battle_component_1.BattleComponent,
            training_component_1.TrainingComponent,
            waiting_room_component_1.WaitingRoomComponent,
        ],
        providers: [
            server_service_1.ServerService,
        ],
    })
], ArenaModule);
exports.ArenaModule = ArenaModule;
//# sourceMappingURL=arena.module.js.map