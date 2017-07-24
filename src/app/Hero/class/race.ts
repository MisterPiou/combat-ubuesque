import { Spell, SPELLS } from './spell';

export class Race {
    id: number;
    name: string;
    info: string;
    spells: Spell[];
}

export const RACES: Race[] = [
    /* SBIRE */
    { 
        id: 0, 
        name: 'Sbire', 
        info: 'Aucune', 
        spells: [SPELLS[0],SPELLS[0],SPELLS[0]]
    },
    /* BARBARE */
    { 
        id: 1, 
        name: 'Barbare', 
        info: 'Les barbares Branlarien', 
        spells: [SPELLS[0],SPELLS[1],SPELLS[2]]
    },
    /* Valkyri */
    { 
        id: 2, 
        name: 'Valkyri', 
        info: 'Les Valkyris du Bymb Hola', 
        spells: [SPELLS[0],SPELLS[3],SPELLS[4]]
    },
    /* Voleur */
    { 
        id: 3, 
        name: 'Voleur', 
        info: 'Les Voleurs des Scapinery', 
        spells: [SPELLS[0],SPELLS[5],SPELLS[6]]
    }
];
