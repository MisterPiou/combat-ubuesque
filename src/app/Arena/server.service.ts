import { Injectable }   from '@angular/core';

import {url_root} from '../data';

@Injectable()
export class ServerService {
    
    socket = io(url_root+':4000');
    infoAsker: {} = { id: 0, pseudo: "", race: null, level: 0, socketId: "" };
    infoReceiver: {} = { id: 0, pseudo: "", race: null, level: 0, socketId: "" };
    
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