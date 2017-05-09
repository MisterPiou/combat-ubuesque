import { Spell, SPELLS } from './spell';

export class Race {
    id: number;
    name: string;
    info: string;
    spells: Spell[];
}

const RACES: Race[] = [
    /* BARBARE */
    { 
        id: 1, 
        name: 'Barbare', 
        info: 'Les barbares Branlarien', 
        spells: null
    },
    /* Valkyri */
    { 
        id: 2, 
        name: 'Valkyri', 
        info: 'Les Valkyris du Bymb Hola', 
        spells: null
    },
    /* Voleur */
    { 
        id: 3, 
        name: 'Voleur', 
        info: 'Les Voleurs des Scapinery', 
        spells: null
    }
];
