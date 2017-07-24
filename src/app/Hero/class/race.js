"use strict";
var spell = require("./spell");
var Race = (function () {
    function Race(id, name, info, spells) {
        this.id = id;
        this.name = name;
        this.info = info;
        this.spells = spells;
    }
    return Race;
}());
exports.Race = Race;
exports.Sbire = new Race(0, 'Sbire', 'Aucune', [
    new spell.Spell(0, 'Frappe', 'Une giffle des plus banales', spell.SpellType.attack, spell.SpellInfluence.muscle, 5, 10, 1.1)
]);
//# sourceMappingURL=race.js.map