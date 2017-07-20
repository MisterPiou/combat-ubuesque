"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var hero_component_1 = require("./hero.component");
var hero_home_component_1 = require("./hero-home.component");
var hero_card_component_1 = require("./hero-card.component");
var hero_routing_module_1 = require("./hero-routing.module");
var HeroModule = (function () {
    function HeroModule() {
    }
    return HeroModule;
}());
HeroModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            hero_routing_module_1.HeroRoutingModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
        ],
        declarations: [
            hero_component_1.HeroComponent,
            hero_home_component_1.HeroHomeComponent,
            hero_card_component_1.HeroCardComponent,
        ]
    })
], HeroModule);
exports.HeroModule = HeroModule;
//# sourceMappingURL=hero.module.js.map