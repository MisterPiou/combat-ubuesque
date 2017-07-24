"use strict";
var spell_1 = require("./spell");
var Race = (function () {
    function Race() {
    }
    return Race;
}());
exports.Race = Race;
exports.RACES = [
    /* SBIRE */
    {
        id: 0,
        name: 'Sbire',
        info: 'Aucune',
        spells: [spell_1.SPELLS[0], spell_1.SPELLS[0], spell_1.SPELLS[0]]
    },
    /* BARBARE */
    {
        id: 1,
        name: 'Barbare',
        info: 'Les barbares Branlarien',
        spells: [spell_1.SPELLS[0], spell_1.SPELLS[1], spell_1.SPELLS[2]]
    },
    /* Valkyri */
    {
        id: 2,
        name: 'Valkyri',
        info: 'Les Valkyris du Bymb Hola',
        spells: [spell_1.SPELLS[0], spell_1.SPELLS[3], spell_1.SPELLS[4]]
    },
    /* Voleur */
    {
        id: 3,
        name: 'Voleur',
        info: 'Les Voleurs des Scapinery',
        spells: [spell_1.SPELLS[0], spell_1.SPELLS[5], spell_1.SPELLS[6]]
    }
];
//# sourceMappingURL=race.js.map