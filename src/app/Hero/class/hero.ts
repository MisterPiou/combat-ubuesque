import { Race }  from './race';

export class Hero {
    constructor(
        public id: number,
        public user_id: number,
        public name: string,
        public race: Race,
        public state: number,
        public xp: number,
        public level: number,
        public life: number
    ) {}
}
