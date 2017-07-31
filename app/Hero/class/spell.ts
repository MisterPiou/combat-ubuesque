export class Spell {
    constructor(
        public id: number,
        public name: string,
        public info: string,
        public type: number,
        public influenceBy: number,
        public cooldown: number,
        public effect: number,
        public ratio: number,
    ){}
}

export enum SpellType {
    attack = 0,
    boost = 1,
    freeze = 2,
    shield = 3,
    hide = 4,
}

export enum SpellInfluence {
    none = 0,
    muscle = 1,
    appeal = 2,
    smart = 3,
    charm = 4,
}
