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
var arenaRoutes = [
    {
        path: '',
        component: arena_component_1.ArenaComponent
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