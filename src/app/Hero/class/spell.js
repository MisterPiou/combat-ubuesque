"use strict";
var Spell = (function () {
    function Spell() {
    }
    return Spell;
}());
exports.Spell = Spell;
var Type;
(function (Type) {
    Type[Type["attack"] = 0] = "attack";
    Type[Type["boost"] = 1] = "boost";
    Type[Type["freeze"] = 2] = "freeze";
    Type[Type["shield"] = 3] = "shield";
    Type[Type["hide"] = 4] = "hide";
})(Type || (Type = {}));
var Influence;
(function (Influence) {
    Influence[Influence["none"] = 0] = "none";
    Influence[Influence["muscle"] = 1] = "muscle";
    Influence[Influence["appeal"] = 2] = "appeal";
    Influence[Influence["smart"] = 3] = "smart";
    Influence[Influence["charm"] = 4] = "charm";
})(Influence || (Influence = {}));
exports.SPELLS = [
    {
        id: 0, name: 'Frappe',
        info: 'Une giffle des plus banales',
        type: Type.attack, influenceBy: Influence.muscle,
        cooldown: 10, effect: 10, ratio: 1.1
    },
    /* Attaque Barbare */
    {
        id: 10, name: 'Kikdatafasse',
        info: 'Gros coup de pied',
        type: Type.attack, influenceBy: Influence.muscle,
        cooldown: 20, effect: 100, ratio: 1.1
    },
    {
        id: 11, name: 'Krikitu',
        info: 'Cri qui motive le lanceur',
        type: Type.boost, influenceBy: Influence.appeal,
        cooldown: 50, effect: 30, ratio: 1.1
    },
    /* Attaque Valkyri */
    {
        id: 20, name: 'Coude Glyphe',
        info: 'Lance une grosse giffle à l\'adversaire',
        type: Type.attack, influenceBy: Influence.muscle,
        cooldown: 20, effect: 50, ratio: 1.1
    },
    {
        id: 21, name: 'Charmoi',
        info: 'Lance un charme qui pertube l\'adversaire',
        type: Type.freeze, influenceBy: Influence.charm,
        cooldown: 50, effect: 30, ratio: 1.1
    },
    /* Attaque Voleurs */
    {
        id: 30, name: 'Fourbeur',
        info: 'Donne un petit coup dans le dos (plus efficace pendant timidité) qui pertube l\'adversaire',
        type: Type.attack, influenceBy: Influence.muscle,
        cooldown: 20, effect: 30, ratio: 1.1
    },
    {
        id: 31, name: 'Timiditai',
        info: 'Se fais discret au point de se faire oublier',
        type: Type.hide, influenceBy: Influence.smart,
        cooldown: 50, effect: 30, ratio: 1.1
    },
];
//# sourceMappingURL=spell.js.map