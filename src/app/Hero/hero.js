"use strict";
var Hero = (function () {
    function Hero(user_id, id, name, race, state, xp, level, life) {
        this.user_id = user_id;
        this.id = id;
        this.name = name;
        this.race = race;
        this.state = state;
        this.xp = xp;
        this.level = level;
        this.life = life;
    }
    return Hero;
}());
exports.Hero = Hero;
//# sourceMappingURL=hero.js.map