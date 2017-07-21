"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var FormulaService = (function () {
    function FormulaService() {
    }
    FormulaService.prototype.calculateLifeMax = function (level) {
        return ((level * 10) + 90);
    };
    FormulaService.prototype.calculateXpNeed = function (level) {
        return (Math.pow(level, 2) * (100 + Math.pow(level, 2)));
    };
    FormulaService.prototype.calculateXpVictory = function (lvlHero, lvlOpponent) {
        return ((lvlHero * lvlOpponent) * 10);
    };
    FormulaService.prototype.calculateXpDefeat = function (lvlHero, lvlOpponent) {
        return ((lvlHero * lvlOpponent) * 1);
    };
    return FormulaService;
}());
FormulaService = __decorate([
    core_1.Injectable()
], FormulaService);
exports.FormulaService = FormulaService;
//# sourceMappingURL=formula.service.js.map