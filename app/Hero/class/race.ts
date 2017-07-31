import * as spell from './spell';

export class Race {
    constructor(
        public id: number,
        public name: string,
        public info: string,
        public spells: spell.Spell[],
    ){}
}

export var Sbire = new Race( 
        0, 
        'Sbire', 
        'Aucune', 
        [
            new spell.Spell(0, 'Frappe', 'Une giffle des plus banales', spell.SpellType.attack, spell.SpellInfluence.muscle, 5, 10, 1.1)
        ]
    );