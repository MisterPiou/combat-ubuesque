"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var hero_1 = require("./hero");
var race_1 = require("./race");
var HeroComponent = (function () {
    function HeroComponent() {
        this.heroes = [];
        this.races = race_1.RACES;
        this.model = new hero_1.Hero(1, 1, "Jean-Louis", 1, 0, 0, 1, 100);
        this.isSubmitted = false;
    }
    HeroComponent.prototype.onSubmit = function () {
        this.heroes.push(this.model);
        this.model = new hero_1.Hero(1, 1, "Jean-Louis", 1, 0, 0, 1, 100);
        $('#myModal').modal('hide');
    };
    return HeroComponent;
}());
HeroComponent = __decorate([
    core_1.Component({
        selector: 'hero',
        templateUrl: './hero.component.html',
    })
], HeroComponent);
exports.HeroComponent = HeroComponent;
//# sourceMappingURL=hero.component.js.map