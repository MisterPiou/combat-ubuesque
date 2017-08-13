import { Injectable }   from '@angular/core';

import {url_root}   from '../data';
import {Race}       from '../Hero/class/race';

export class InfoServUser {
    constructor(
        public id: number,
        public pseudo: string,
        public race: Race,
        public level: number,
        public socketId: string,
    ){}
}

@Injectable()
export class ServerService {
    
    socket = io(url_root+':4000');
    infoAsker = new InfoServUser(0,"",null,0,"");
    infoReceiver = new InfoServUser(0,"",null,0,"");
    
    getSocket() {
        return this.socket;
    }
    
    setInfoAsker(info: any) {
        this.infoAsker = info;
    }
    
    getInfoAsker() {
        return this.infoAsker;
    }
    
    setInfoReceiver(info: any) {
        this.infoReceiver = info;
    }
    
    getInfoReceiver() {
        return this.infoReceiver;
    }
    
    setInfos(infoAsker: any, infoReceiver: any) {
        this.infoAsker = infoAsker;
        this.infoReceiver = infoReceiver;
    }
}