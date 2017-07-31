"use strict";
var Spell = (function () {
    function Spell(id, name, info, type, influenceBy, cooldown, effect, ratio) {
        this.id = id;
        this.name = name;
        this.info = info;
        this.type = type;
        this.influenceBy = influenceBy;
        this.cooldown = cooldown;
        this.effect = effect;
        this.ratio = ratio;
    }
    return Spell;
}());
exports.Spell = Spell;
var SpellType;
(function (SpellType) {
    SpellType[SpellType["attack"] = 0] = "attack";
    SpellType[SpellType["boost"] = 1] = "boost";
    SpellType[SpellType["freeze"] = 2] = "freeze";
    SpellType[SpellType["shield"] = 3] = "shield";
    SpellType[SpellType["hide"] = 4] = "hide";
})(SpellType = exports.SpellType || (exports.SpellType = {}));
var SpellInfluence;
(function (SpellInfluence) {
    SpellInfluence[SpellInfluence["none"] = 0] = "none";
    SpellInfluence[SpellInfluence["muscle"] = 1] = "muscle";
    SpellInfluence[SpellInfluence["appeal"] = 2] = "appeal";
    SpellInfluence[SpellInfluence["smart"] = 3] = "smart";
    SpellInfluence[SpellInfluence["charm"] = 4] = "charm";
})(SpellInfluence = exports.SpellInfluence || (exports.SpellInfluence = {}));
//# sourceMappingURL=spell.js.map