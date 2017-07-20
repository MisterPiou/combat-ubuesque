export class Spell {
    id: number;
    name: string;
    info: string;
    type: number;
    cooldown: number;
    effect: number;
    ratio: number;
}

export const SPELLS: Spell[] = [
    { 
        id: 0, name: 'Frappe', 
        info:'Une giffle des plus banales', 
        type: 1, cooldown: 10, effect: 10, ratio: 1.1
    },
    /* Attaque Barbare */
    { 
        id: 10, name: 'Kikdatafasse', 
        info:'Gros coup de pied', 
        type: 1, cooldown: 20, effect: 100, ratio: 1.1
    },
    { 
        id: 11, name: 'Krikitu', 
        info:'Cri qui motive le lanceur', 
        type: 2, cooldown: 50, effect: 30, ratio: 1.1
    },
    /* Attaque Valkyri */
    { 
        id: 20, name: '', 
        info:'', 
        type: 1, cooldown: 20, effect: 50, ratio: 1.1
    },
    { 
        id: 21, name: 'Charmoi', 
        info:'Lance un charme qui pertube l\'adversaire', 
        type: 2, cooldown: 50, effect: 30, ratio: 1.1
    },
    /* Attaque Voleurs */
    { 
        id: 30, name: 'Fourbeur', 
        info:'Donne un petit coup dans le dos (plus efficace pendant timidité)', 
        type: 1, cooldown: 20, effect: 30, ratio: 1.1
    },
    { 
        id: 31, name: 'Timiditai', 
        info:'Se fais discret au point de se faire oublier', 
        type: 2, cooldown: 50, effect: 30, ratio: 1.1
    },
];
