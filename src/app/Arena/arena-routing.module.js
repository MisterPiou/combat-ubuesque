"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var arena_component_1 = require("./arena.component");
var arena_home_component_1 = require("./arena-home.component");
var training_component_1 = require("./training.component");
var battle_component_1 = require("./battle.component");
var waiting_room_component_1 = require("./waiting-room.component");
var arenaRoutes = [
    {
        path: '',
        component: arena_component_1.ArenaComponent,
        children: [
            { path: '', redirectTo: 'arena-door' },
            { path: 'arena-door', component: arena_home_component_1.ArenaHomeComponent },
            { path: 'training', component: training_component_1.TrainingComponent },
            { path: 'waiting-room', component: waiting_room_component_1.WaitingRoomComponent },
            { path: 'battle/:id/:lvl', component: battle_component_1.BattleComponent },
        ]
    }
];
var ArenaRoutingModule = (function () {
    function ArenaRoutingModule() {
    }
    return ArenaRoutingModule;
}());
ArenaRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(arenaRoutes)],
        exports: [router_1.RouterModule]
    })
], ArenaRoutingModule);
exports.ArenaRoutingModule = ArenaRoutingModule;
//# sourceMappingURL=arena-routing.module.js.map